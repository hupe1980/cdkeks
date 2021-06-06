import { HelmChart } from '@aws-cdk/aws-eks';
import { IDomain } from '@aws-cdk/aws-elasticsearch';
import { Effect, ManagedPolicy, PolicyStatement } from '@aws-cdk/aws-iam';
import { LogGroup, RetentionDays, ILogGroup } from '@aws-cdk/aws-logs';
import { Stack, RemovalPolicy } from '@aws-cdk/core';
import { Construct } from 'constructs';

import { Namespace } from '../../namespace';
import { Platform } from '../../platform';
import { ServiceAccount } from '../../service-account';
import { IAddon } from '../addon';

export interface CloudWatchOptions {
  readonly logGroup: ILogGroup;

  /**
   * The log filter
   * */
  readonly match?: string;
}

export interface ElasticsearchOptions {
  readonly domain: IDomain;

  /**
   * The log filter
   * */
  readonly match?: string;
}

export interface AwsForFluentBitAddonProps {
  /**
   * @default `logging`
   */
  readonly namespaceName?: string;

  /**
   * @default `0.1.6`
   */
  readonly version?: string;

  readonly cloudWatchOptions?: CloudWatchOptions;

  readonly elasticsearchOptions?: ElasticsearchOptions;
}

export class AwsForFluentBitAddon implements IAddon {
  public readonly name = 'aws-for-fluent-bit';

  constructor(private readonly props: AwsForFluentBitAddonProps = {}) {}

  public install(scope: Construct, platform: Platform): void {
    const region = Stack.of(scope).region;

    const namespace = new Namespace(scope, 'AwsForFluentBitAddonNamespace', {
      platform,
      metadata: {
        name: this.props.namespaceName ?? 'logging',
      },
    });

    const serviceAccount = new ServiceAccount(scope, 'AwsForFluentBitAddonServiceAccount', {
      platform,
      metadata: {
        name: 'fluent-bit',
        namespace: namespace.name,
      },
    });

    serviceAccount.node.addDependency(namespace);

    // Use cloudWatch as default
    const cloudWatchOptions =
      this.props.elasticsearchOptions || this.props.cloudWatchOptions
        ? this.props.cloudWatchOptions
        : {
            logGroup: new LogGroup(scope, 'AwsForFluentBitAddonDefaultLogGroup', {
              logGroupName: `/aws/eks/fluentbit/${platform.cluster.clusterName}`,
              removalPolicy: RemovalPolicy.DESTROY,
              retention: RetentionDays.ONE_MONTH,
            }),
          };

    const chart = new HelmChart(scope, 'AwsForFluentBitAddonChart', {
      cluster: platform.cluster,
      namespace: namespace.name,
      repository: 'https://aws.github.io/eks-charts',
      chart: 'aws-for-fluent-bit',
      release: 'aws-for-fluent-bit',
      version: this.props.version ?? '0.1.6',
      values: {
        serviceAccount: {
          create: false,
          name: serviceAccount.name,
        },
        firehose: {
          enabled: false,
        },
        kinesis: {
          enabled: false,
        },
        elasticsearch: this.parseElasticsearchOptions(region, serviceAccount, this.props.elasticsearchOptions),
        cloudWatch: this.parseCloudWatchOptions(region, serviceAccount, cloudWatchOptions),
      },
    });

    chart.node.addDependency(namespace);
  }

  private parseCloudWatchOptions(region: string, serviceAccount: ServiceAccount, options?: CloudWatchOptions): Record<string, unknown> {
    if (!options) {
      return {
        enabled: false,
      };
    }

    serviceAccount.role.addManagedPolicy(ManagedPolicy.fromAwsManagedPolicyName('CloudWatchAgentServerPolicy'));

    return {
      enabled: true,
      region,
      logGroupName: options.logGroup.logGroupName,
      match: options?.match ?? '*',
      autoCreateGroup: false,
    };
  }

  private parseElasticsearchOptions(region: string, serviceAccount: ServiceAccount, options?: ElasticsearchOptions): Record<string, unknown> {
    if (!options) {
      return {
        enabled: false,
      };
    }

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['es:ESHttp*'],
        resources: [options.domain.domainArn],
      }),
    );

    return {
      enabled: true,
      awsRegion: region,
      awsAuth: 'On',
      tls: 'On',
      host: options.domain.domainEndpoint,
      port: 443,
      match: options?.match ?? '*',
    };
  }
}
