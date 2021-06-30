import { HelmChart } from '@aws-cdk/aws-eks';
import { Construct } from 'constructs';

import { Namespace } from '../../namespace';
import { Platform } from '../../platform';
import { IAddon } from '../addon';

export interface ArgoCDAddonProps {
  /**
   * @default `nginx-ingress`
   */
  readonly namespaceName?: string;

  /**
   * @default `3.6.6`
   */
  readonly version?: string;
}

export class ArgoCDAddon implements IAddon {
  public static readonly NAME = 'argo-cd';

  constructor(private readonly props: ArgoCDAddonProps = {}) {}

  public install(scope: Construct, platform: Platform): void {
    const namespace = new Namespace(scope, 'ArgoCDAddonNamespace', {
      platform,
      metadata: {
        name: this.props.namespaceName ?? 'argo-cd',
      },
    });

    const chart = new HelmChart(scope, 'ArgoCDAddonChart', {
      cluster: platform.cluster,
      namespace: namespace.name,
      repository: 'https://argoproj.github.io/argo-helm',
      chart: 'argo-cd',
      version: this.props.version ?? '3.6.6',
    });

    chart.node.addDependency(namespace);
  }

  public get name(): string {
    return ArgoCDAddon.NAME;
  }
}
