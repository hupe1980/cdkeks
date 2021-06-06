import { ServiceAccount } from '@aws-cdk/aws-eks';
import { Construct } from '@aws-cdk/core';
import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';

import { Cdk8sConstruct, Cdk8sConstructProps } from './cdk8s-construct';
import { Service } from './service';
import { generateMetadata } from './utils';

export interface DeploymentProps extends Cdk8sConstructProps {
  readonly serviceAccount?: ServiceAccount;
  readonly containers?: kplus.ContainerProps[];
}

export class Deployment extends Cdk8sConstruct {
  public readonly apiObject: kplus.Deployment;

  public readonly labelSelector: Record<string, string>;

  constructor(scope: Construct, id: string, props: DeploymentProps) {
    super(scope, id, props);

    const serviceAccount = props.serviceAccount ? kplus.ServiceAccount.fromServiceAccountName(props.serviceAccount.serviceAccountName) : undefined;

    this.apiObject = new kplus.Deployment(this.chart, 'deployment', {
      metadata: generateMetadata(props.metadata),
      containers: props.containers,
      serviceAccount,
    });

    this.labelSelector = this.apiObject.labelSelector;
  }

  public expose(id: string, port: number, options: kplus.ExposeOptions = {}): Service {
    const service = new Service(this, id, {
      platform: this.platform,
      metadata: options.name ? { name: options.name } : undefined,
      type: options.serviceType ?? kplus.ServiceType.CLUSTER_IP,
    });

    service.addDeployment(this, port, { protocol: options.protocol, targetPort: options.targetPort });
    return service;
  }

  public get containers(): kplus.Container[] {
    return this.apiObject.containers;
  }

  public get name(): string {
    return this.apiObject.name;
  }

  public get metadata(): cdk8s.ApiObjectMetadataDefinition {
    return this.apiObject.metadata;
  }
}
