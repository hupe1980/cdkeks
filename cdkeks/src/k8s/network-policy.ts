import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';
import { Construct } from 'constructs';

import * as k8s from './imports/k8s';

export interface NetworkPolicyProps extends kplus.ResourceProps {
  readonly policyTypes?: PolicyType[];
}
export class NetworkPolicy extends kplus.Resource {
  public readonly policyTypes: PolicyType[];

  protected readonly apiObject: cdk8s.ApiObject;

  public constructor(scope: Construct, id: string, props: NetworkPolicyProps) {
    super(scope, id);

    this.apiObject = new k8s.KubeNetworkPolicy(this, 'Resource', {
      metadata: props.metadata,
      spec: cdk8s.Lazy.any({ produce: () => this.toKube() }),
    });

    this.policyTypes = props.policyTypes ?? [PolicyType.INGRESS];
  }

  private toKube(): k8s.NetworkPolicySpec {
    return {
      podSelector: {},
      policyTypes: this.policyTypes,
    };
  }
}

export enum PolicyType {
  INGRESS = 'Ingress',
  EGRESS = 'Egress',
}
