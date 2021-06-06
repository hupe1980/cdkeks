import { HelmChart } from '@aws-cdk/aws-eks';
import { Construct } from 'constructs';

import { Platform } from '../../platform';
import { IAddon } from '../addon';

export interface AwsCalicoProps {
  /**
   * @default `0.3.5`
   */
  readonly version?: string;
}

export class AwsCalicoAddon implements IAddon {
  public static readonly NAME = 'aws-calico';

  constructor(private readonly props: AwsCalicoProps = {}) {}

  public install(scope: Construct, platform: Platform): void {
    new HelmChart(scope, 'AwsCalicoAddonChart', {
      cluster: platform.cluster,
      // Default setup is using built in priorityclasses (system-cluster-critical and system-node-critical) which are currently restricted to kube-system namespace.
      // Follow https://github.com/kubernetes/kubernetes/issues/76308 to see if anything has changed.
      namespace: 'kube-system',
      repository: 'https://aws.github.io/eks-charts',
      chart: 'aws-calico',
      release: 'aws-calico',
      version: this.props.version ?? '0.3.5',
    });
  }

  public get name(): string {
    return AwsCalicoAddon.NAME;
  }
}
