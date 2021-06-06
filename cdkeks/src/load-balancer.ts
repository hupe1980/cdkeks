import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { KubernetesObjectValue } from '@aws-cdk/aws-eks';
import { SslPolicy } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Construct } from '@aws-cdk/core';

import { Cdk8sConstructProps } from './cdk8s-construct';
import { Service, ServiceType } from './service';

import { generateMetadata } from './utils';

export interface LoadBalancerProps extends Cdk8sConstructProps {
  readonly backendProtocal?: BackendProtocol;

  readonly certificate?: ICertificate;

  readonly sslPolicy?: SslPolicy;

  /**
   * @default false
   */
  readonly internal: boolean;
}

export class LoadBalancer extends Service {
  constructor(scope: Construct, id: string, props: LoadBalancerProps) {
    const annotations: Record<string, string> = {
      'service.beta.kubernetes.io/aws-load-balancer-internal': props.internal ? 'true' : 'false',
    };

    if (props.backendProtocal) {
      annotations['service.beta.kubernetes.io/aws-load-balancer-backend-protocol'] = props.backendProtocal;
    }

    if (props.certificate) {
      annotations['service.beta.kubernetes.io/aws-load-balancer-ssl-cert'] = props.certificate?.certificateArn;
    }

    if (props.sslPolicy) {
      annotations['service.beta.kubernetes.io/aws-load-balancer-ssl-negotiation-policy'] = props.sslPolicy;
    }

    super(scope, id, {
      metadata: generateMetadata(props.metadata, annotations),
      platform: props.platform,
      type: ServiceType.LOAD_BALANCER,
    });
  }

  public get loadBalancerAddress(): string {
    const loadBalancerAddress = new KubernetesObjectValue(this, 'ServiceAddress', {
      cluster: this.platform.cluster,
      objectType: 'service',
      objectName: this.name,
      jsonPath: '.status.loadBalancer.ingress[0].hostname', // https://kubernetes.io/docs/reference/kubectl/jsonpath/
    });

    return loadBalancerAddress.value;
  }
}

export interface NetworkLoadBalancerProps extends Cdk8sConstructProps {
  /**
   * @default false
   */
  readonly internal: boolean;
}

export class NetworkLoadBalancer extends Service {
  constructor(scope: Construct, id: string, props: NetworkLoadBalancerProps) {
    const annotations: Record<string, string> = {
      'service.beta.kubernetes.io/aws-load-balancer-type': 'nlb',
      'service.beta.kubernetes.io/aws-load-balancer-internal': props.internal ? 'true' : 'false',
    };

    super(scope, id, {
      metadata: generateMetadata(props.metadata, annotations),
      platform: props.platform,
      type: ServiceType.LOAD_BALANCER,
    });
  }
}

export enum BackendProtocol {
  HTTPS = 'https',
  HTTP = 'http',
  TCP = 'tcp',
  SSL = 'ssl',
}
