import * as cdk8s from 'cdk8s';
import { Construct } from 'constructs';
import { Cdk8sConstruct, Cdk8sConstructProps } from './cdk8s-construct';

import * as k8s from './k8s';
import { generateMetadata } from './utils';

export interface INamespace {
  readonly name: string;
}

export type NamespaceProps = Cdk8sConstructProps;

export class Namespace extends Cdk8sConstruct implements INamespace {
  public static fromNamespaceName(name: string): INamespace {
    return {
      name,
    };
  }

  public readonly apiObject: k8s.Namespace;

  constructor(scope: Construct, id: string, props: NamespaceProps) {
    super(scope, id, props);

    this.apiObject = new k8s.Namespace(this.chart, 'Namespace', {
      metadata: generateMetadata(props.metadata),
    });
  }

  public get name(): string {
    return this.apiObject.name;
  }

  public get metadata(): cdk8s.ApiObjectMetadataDefinition {
    return this.apiObject.metadata;
  }
}
