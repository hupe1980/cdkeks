import { Construct as CoreConstruct } from '@aws-cdk/core';
import * as cdk8s from 'cdk8s';
import { Construct, Node } from 'constructs';

import { Platform } from './platform';

export interface Cdk8sConstructProps {
  readonly metadata?: cdk8s.ApiObjectMetadata;
  readonly platform: Platform;
}

export abstract class Cdk8sConstruct extends CoreConstruct {
  protected readonly platform: Platform;
  protected readonly chart: cdk8s.Chart;

  public abstract readonly name: string;
  public abstract readonly metadata: cdk8s.ApiObjectMetadataDefinition;

  constructor(scope: Construct, id: string, props: Cdk8sConstructProps) {
    super(scope, id);
    this.platform = props.platform;
    this.chart = new cdk8s.Chart(new cdk8s.App(), 'chart');
  }

  protected onPrepare(): void {
    this.platform.addCdk8sChart(Node.of(this).id, this.chart);
  }
}
