import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';
import { Construct } from 'constructs';

import * as k8s from './imports/k8s';

export type NamespaceProps = kplus.ResourceProps;

export class Namespace extends kplus.Resource {
  protected readonly apiObject: cdk8s.ApiObject;

  public constructor(scope: Construct, id: string, props: NamespaceProps) {
    super(scope, id);

    this.apiObject = new k8s.KubeNamespace(this, 'Resource', {
      metadata: props.metadata,
      spec: cdk8s.Lazy.any({ produce: () => this.toKube() }),
    });
  }

  private toKube(): k8s.NamespaceSpec {
    return {};
  }
}
