import { ICluster, HelmChart, HelmChartOptions, KubernetesManifest } from '@aws-cdk/aws-eks';
import { Construct as CoreConstruct } from '@aws-cdk/core';
import { Construct } from 'constructs';

import { IAddon } from './addons';

export interface PlatformProps {
  readonly cluster: ICluster;

  readonly addons?: IAddon[];

  /**
   * @default false;
   */
  readonly strict?: boolean;
}

export class Platform extends CoreConstruct {
  public readonly cluster: ICluster;
  public readonly strict: boolean;

  constructor(scope: Construct, id: string, props: PlatformProps) {
    super(scope, id);

    this.cluster = props.cluster;
    this.strict = !!props.strict;

    if (props.addons) {
      props.addons.forEach((addon) => this.addAddon(addon));
    }
  }

  public addAddon(addon: IAddon): void {
    addon.install(this, this);
  }

  public addManifest(id: string, ...manifest: Record<string, any>[]): KubernetesManifest {
    return this.cluster.addManifest(id, manifest);
  }

  public addHelmChart(id: string, options: HelmChartOptions): HelmChart {
    return this.cluster.addHelmChart(id, options);
  }

  public addCdk8sChart(id: string, chart: Construct): KubernetesManifest {
    return this.cluster.addCdk8sChart(id, chart);
  }
}
