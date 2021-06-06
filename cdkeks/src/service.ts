import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';
import { Construct } from 'constructs';

import { Cdk8sConstruct, Cdk8sConstructProps } from './cdk8s-construct';
import { Deployment } from './deployment';
import { generateMetadata } from './utils';

export interface ServiceProps extends Cdk8sConstructProps {
  /**
   * @default ServiceType.CLUSTER_IP
   */
  readonly type?: ServiceType;

  readonly ports?: kplus.ServicePort[];
}

export class Service extends Cdk8sConstruct {
  public readonly apiObject: kplus.Service;

  constructor(scope: Construct, id: string, props: ServiceProps) {
    super(scope, id, props);

    this.apiObject = new kplus.Service(this.chart, 'Service', {
      metadata: generateMetadata(props.metadata),
      ports: props.ports,
      type: props.type ?? ServiceType.CLUSTER_IP,
    });
  }

  public addSelector(label: string, value: string): void {
    this.apiObject.addSelector(label, value);
  }

  public addDeployment(deployment: Deployment, port: number, options: kplus.ServicePortOptions = {}): void {
    this.apiObject.addDeployment(deployment.apiObject, port, options);
  }

  public get selector(): Record<string, string> {
    return this.apiObject.selector;
  }

  public get ports(): kplus.ServicePort[] {
    return this.apiObject.ports;
  }

  public get name(): string {
    return this.apiObject.name;
  }

  public get metadata(): cdk8s.ApiObjectMetadataDefinition {
    return this.apiObject.metadata;
  }
}

export enum ServiceType {
  CLUSTER_IP = 'ClusterIP',
  NODE_PORT = 'NodePort',
  LOAD_BALANCER = 'LoadBalancer',
  EXTERNAL_NAME = 'ExternalName',
}
