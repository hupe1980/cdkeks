import {
  AddToPrincipalPolicyResult,
  IPrincipal,
  IRole,
  OpenIdConnectPrincipal,
  PolicyStatement,
  PrincipalPolicyFragment,
  Role,
} from '@aws-cdk/aws-iam';
import { CfnJson, Names } from '@aws-cdk/core';
import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';
import { Construct } from 'constructs';

import { Cdk8sConstruct, Cdk8sConstructProps } from './cdk8s-construct';
import { generateMetadata } from './utils';

export interface ServiceAccountProps extends Cdk8sConstructProps {
  readonly secrets?: kplus.ISecret[];
}

export class ServiceAccount extends Cdk8sConstruct implements IPrincipal {
  public readonly role: IRole;

  public readonly assumeRoleAction: string;
  public readonly grantPrincipal: IPrincipal;
  public readonly policyFragment: PrincipalPolicyFragment;

  public readonly apiObject: kplus.ServiceAccount;

  constructor(scope: Construct, id: string, props: ServiceAccountProps) {
    super(scope, id, props);

    const { name = Names.uniqueId(this).toLowerCase(), namespace = 'default' } = props.metadata ?? {};

    const conditions = new CfnJson(this, 'ConditionJson', {
      value: {
        [`${props.platform.cluster.openIdConnectProvider.openIdConnectProviderIssuer}:aud`]: 'sts.amazonaws.com',
        [`${props.platform.cluster.openIdConnectProvider.openIdConnectProviderIssuer}:sub`]: `system:serviceaccount:${namespace}:${name}`,
      },
    });

    const principal = new OpenIdConnectPrincipal(props.platform.cluster.openIdConnectProvider).withConditions({
      StringEquals: conditions,
    });

    this.role = new Role(this, 'Role', { assumedBy: principal });
    this.assumeRoleAction = this.role.assumeRoleAction;
    this.grantPrincipal = this.role.grantPrincipal;
    this.policyFragment = this.role.policyFragment;

    const annotation = {
      'eks.amazonaws.com/role-arn': this.role.roleArn,
    };

    this.apiObject = new kplus.ServiceAccount(this.chart, 'ServiceAccount', {
      metadata: generateMetadata(
        {
          ...props.metadata,
          name,
          namespace,
        },
        annotation,
      ),
      secrets: props.secrets,
    });
  }

  /**
   * @deprecated use `addToPrincipalPolicy()`
   */
  public addToPolicy(statement: PolicyStatement): boolean {
    return this.addToPrincipalPolicy(statement).statementAdded;
  }

  public addToPrincipalPolicy(statement: PolicyStatement): AddToPrincipalPolicyResult {
    return this.role.addToPrincipalPolicy(statement);
  }

  public get name(): string {
    return this.apiObject.name;
  }

  public get metadata(): cdk8s.ApiObjectMetadataDefinition {
    return this.apiObject.metadata;
  }
}
