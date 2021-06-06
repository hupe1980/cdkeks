import { Construct } from '@aws-cdk/core';
import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';

import { Cdk8sConstruct, Cdk8sConstructProps } from './cdk8s-construct';
import { generateMetadata } from './utils';

export interface NginxIngressProps extends Cdk8sConstructProps {
  readonly rewriteTarget?: string;
  readonly sslRedirect?: boolean;
  readonly forceSslRedirect?: boolean;
  readonly rules?: kplus.IngressV1Beta1Rule[];
}

export class NginxIngress extends Cdk8sConstruct {
  private readonly apiObject: kplus.IngressV1Beta1;

  constructor(scope: Construct, id: string, props: NginxIngressProps) {
    super(scope, id, props);

    const annotations: Record<string, string> = {
      'kubernetes.io/ingress.class': 'nginx',
    };

    if (props.rewriteTarget) {
      annotations['nginx.ingress.kubernetes.io/rewrite-target'] = props.rewriteTarget;
    }

    this.apiObject = new kplus.IngressV1Beta1(this.chart, 'ingress', {
      metadata: generateMetadata(props.metadata, annotations),
      rules: props.rules,
    });
  }

  public addRule(path: string, backend: kplus.IngressV1Beta1Backend): void {
    this.apiObject.addRule(path, backend);
  }

  public get name(): string {
    return this.apiObject.name;
  }

  public get metadata(): cdk8s.ApiObjectMetadataDefinition {
    return this.apiObject.metadata;
  }
}
