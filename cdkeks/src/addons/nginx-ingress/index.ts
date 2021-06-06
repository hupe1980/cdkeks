import { HelmChart } from '@aws-cdk/aws-eks';
import { Construct } from 'constructs';

import { Namespace } from '../../namespace';
import { Platform } from '../../platform';
import { IAddon } from '../addon';

export interface NginxIngressAddonProps {
  /**
   * @default `nginx-ingress`
   */
  readonly namespaceName?: string;

  /**
   * @default `3.6.6`
   */
  readonly version?: string;
}

export class NginxIngressAddon implements IAddon {
  public static readonly NAME = 'nginx-ingress';

  constructor(private readonly props: NginxIngressAddonProps = {}) {}

  public install(scope: Construct, platform: Platform): void {
    const namespace = new Namespace(scope, 'AwsForFluentBitAddonNamespace', {
      platform,
      metadata: {
        name: this.props.namespaceName ?? 'nginx-ingress',
      },
    });

    const chart = new HelmChart(scope, 'ArgoCDAddonChart', {
      cluster: platform.cluster,
      namespace: namespace.name,
      repository: 'https://helm.nginx.com/stable',
      chart: 'nginx-ingress',
      version: this.props.version ?? '0.9.2',
    });

    chart.node.addDependency(namespace);
  }

  public get name(): string {
    return NginxIngressAddon.NAME;
  }
}
