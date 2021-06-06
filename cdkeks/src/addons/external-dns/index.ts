import { HelmChart } from '@aws-cdk/aws-eks';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { IHostedZone } from '@aws-cdk/aws-route53';
import { Stack } from '@aws-cdk/core';
import { Construct } from 'constructs';

import { Namespace } from '../../namespace';
import { Platform } from '../../platform';
import { ServiceAccount } from '../../service-account';
import { IAddon } from '../addon';

export interface ExternalDnsProps {
  /**
   * @default `dns`
   */
  readonly namespaceName?: string;

  /**
   * @default `5.0.2`
   */
  readonly version?: string;

  readonly hostedZones: IHostedZone[];
}

export class ExternalDnsAddon implements IAddon {
  public readonly name = 'external-dns';

  constructor(private readonly props: ExternalDnsProps) {}

  public install(scope: Construct, platform: Platform): void {
    const region = Stack.of(scope).region;

    const namespace = new Namespace(scope, 'AwsForFluentBitAddonNamespace', {
      platform,
      metadata: {
        name: this.props.namespaceName ?? 'dns',
      },
    });

    const serviceAccount = new ServiceAccount(scope, 'ServiceAccount', {
      platform,
      metadata: {
        name: 'external-dns',
        namespace: namespace.name,
      },
    });

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['route53:ChangeResourceRecordSets', 'route53:ListResourceRecordSets'],
        resources: this.props.hostedZones.map((hostedZone) => hostedZone.hostedZoneArn),
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['route53:ListHostedZones'],
        resources: ['*'],
      }),
    );

    serviceAccount.node.addDependency(namespace);

    const chart = new HelmChart(scope, 'ExternalDnsAddonChart', {
      cluster: platform.cluster,
      namespace: 'kube-system',
      repository: 'https://charts.bitnami.com/bitnami',
      chart: 'external-dns',
      release: 'external-dns',
      version: this.props.version ?? '5.0.2',
      values: {
        provider: 'aws',
        zoneIdFilters: this.props.hostedZones.map((hostedZone) => hostedZone.hostedZoneId),
        aws: {
          region,
        },
        serviceAccount: {
          create: false,
          name: serviceAccount.name,
        },
      },
    });

    chart.node.addDependency(namespace);
  }
}
