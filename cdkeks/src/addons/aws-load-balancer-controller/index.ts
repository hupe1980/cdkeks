import { HelmChart } from '@aws-cdk/aws-eks';
import { Effect, PolicyStatement } from '@aws-cdk/aws-iam';
import { Stack } from '@aws-cdk/core';
import { Construct } from 'constructs';

import { Namespace } from '../../namespace';
import { Platform } from '../../platform';
import { ServiceAccount } from '../../service-account';
import { IAddon } from '../addon';

export interface AwsLoadBalancerControllerAddonProps {
  /**
   * @default `kube-system`
   */
  readonly namespaceName?: string;

  /**
   * @default `1.2.0`
   */
  readonly version?: string;
}

export class AwsLoadBalancerControllerAddon implements IAddon {
  public static readonly NAME = 'aws-load-balancer-controller';

  constructor(private readonly props: AwsLoadBalancerControllerAddonProps = {}) {}

  public install(scope: Construct, platform: Platform): void {
    const region = Stack.of(scope).region;

    const namespace = this.props.namespaceName
      ? new Namespace(scope, 'Namespace', {
          platform,
          metadata: {
            name: this.props.namespaceName,
          },
        })
      : Namespace.fromNamespaceName('kube-system');

    const serviceAccount = new ServiceAccount(scope, 'ServiceAccount', {
      platform,
      metadata: {
        name: 'aws-load-balancer-controller',
        namespace: namespace.name,
        labels: {
          'app.kubernetes.io/component': 'controller',
          'app.kubernetes.io/name': 'aws-load-balancer-controller',
        },
      },
    });

    //serviceAccount.node.addDependency(namespace);

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'iam:CreateServiceLinkedRole',
          'ec2:DescribeAccountAttributes',
          'ec2:DescribeAddresses',
          'ec2:DescribeAvailabilityZones',
          'ec2:DescribeInternetGateways',
          'ec2:DescribeVpcs',
          'ec2:DescribeSubnets',
          'ec2:DescribeSecurityGroups',
          'ec2:DescribeInstances',
          'ec2:DescribeNetworkInterfaces',
          'ec2:DescribeTags',
          'ec2:GetCoipPoolUsage',
          'ec2:DescribeCoipPools',
          'elasticloadbalancing:DescribeLoadBalancers',
          'elasticloadbalancing:DescribeLoadBalancerAttributes',
          'elasticloadbalancing:DescribeListeners',
          'elasticloadbalancing:DescribeListenerCertificates',
          'elasticloadbalancing:DescribeSSLPolicies',
          'elasticloadbalancing:DescribeRules',
          'elasticloadbalancing:DescribeTargetGroups',
          'elasticloadbalancing:DescribeTargetGroupAttributes',
          'elasticloadbalancing:DescribeTargetHealth',
          'elasticloadbalancing:DescribeTags',
        ],
        resources: ['*'],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'cognito-idp:DescribeUserPoolClient',
          'acm:ListCertificates',
          'acm:DescribeCertificate',
          'iam:ListServerCertificates',
          'iam:GetServerCertificate',
          'waf-regional:GetWebACL',
          'waf-regional:GetWebACLForResource',
          'waf-regional:AssociateWebACL',
          'waf-regional:DisassociateWebACL',
          'wafv2:GetWebACL',
          'wafv2:GetWebACLForResource',
          'wafv2:AssociateWebACL',
          'wafv2:DisassociateWebACL',
          'shield:GetSubscriptionState',
          'shield:DescribeProtection',
          'shield:CreateProtection',
          'shield:DeleteProtection',
        ],
        resources: ['*'],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ec2:AuthorizeSecurityGroupIngress', 'ec2:RevokeSecurityGroupIngress'],
        resources: ['*'],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ec2:CreateSecurityGroup'],
        resources: ['*'],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ec2:CreateTags'],
        resources: ['arn:aws:ec2:*:*:security-group/*'],
        conditions: {
          StringEquals: {
            'ec2:CreateAction': 'CreateSecurityGroup',
          },
          Null: {
            'aws:RequestTag/elbv2.k8s.aws/cluster': 'false',
          },
        },
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ec2:CreateTags', 'ec2:DeleteTags'],
        resources: ['arn:aws:ec2:*:*:security-group/*'],
        conditions: {
          Null: {
            'aws:RequestTag/elbv2.k8s.aws/cluster': 'true',
            'aws:ResourceTag/elbv2.k8s.aws/cluster': 'false',
          },
        },
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['ec2:AuthorizeSecurityGroupIngress', 'ec2:RevokeSecurityGroupIngress', 'ec2:DeleteSecurityGroup'],
        resources: ['*'],
        conditions: {
          Null: {
            'aws:ResourceTag/elbv2.k8s.aws/cluster': 'false',
          },
        },
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['elasticloadbalancing:CreateLoadBalancer', 'elasticloadbalancing:CreateTargetGroup'],
        resources: ['*'],
        conditions: {
          Null: {
            'aws:RequestTag/elbv2.k8s.aws/cluster': 'false',
          },
        },
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'elasticloadbalancing:CreateListener',
          'elasticloadbalancing:DeleteListener',
          'elasticloadbalancing:CreateRule',
          'elasticloadbalancing:DeleteRule',
        ],
        resources: ['*'],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['elasticloadbalancing:AddTags', 'elasticloadbalancing:RemoveTags'],
        resources: [
          'arn:aws:elasticloadbalancing:*:*:targetgroup/*/*',
          'arn:aws:elasticloadbalancing:*:*:loadbalancer/net/*/*',
          'arn:aws:elasticloadbalancing:*:*:loadbalancer/app/*/*',
        ],
        conditions: {
          Null: {
            'aws:RequestTag/elbv2.k8s.aws/cluster': 'true',
            'aws:ResourceTag/elbv2.k8s.aws/cluster': 'false',
          },
        },
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['elasticloadbalancing:AddTags', 'elasticloadbalancing:RemoveTags'],
        resources: [
          'arn:aws:elasticloadbalancing:*:*:listener/net/*/*/*',
          'arn:aws:elasticloadbalancing:*:*:listener/app/*/*/*',
          'arn:aws:elasticloadbalancing:*:*:listener-rule/net/*/*/*',
          'arn:aws:elasticloadbalancing:*:*:listener-rule/app/*/*/*',
        ],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'elasticloadbalancing:ModifyLoadBalancerAttributes',
          'elasticloadbalancing:SetIpAddressType',
          'elasticloadbalancing:SetSecurityGroups',
          'elasticloadbalancing:SetSubnets',
          'elasticloadbalancing:DeleteLoadBalancer',
          'elasticloadbalancing:ModifyTargetGroup',
          'elasticloadbalancing:ModifyTargetGroupAttributes',
          'elasticloadbalancing:DeleteTargetGroup',
        ],
        resources: ['*'],
        conditions: {
          Null: {
            'aws:ResourceTag/elbv2.k8s.aws/cluster': 'false',
          },
        },
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: ['elasticloadbalancing:RegisterTargets', 'elasticloadbalancing:DeregisterTargets'],
        resources: ['arn:aws:elasticloadbalancing:*:*:targetgroup/*/*'],
      }),
    );

    serviceAccount.addToPrincipalPolicy(
      new PolicyStatement({
        effect: Effect.ALLOW,
        actions: [
          'elasticloadbalancing:SetWebAcl',
          'elasticloadbalancing:ModifyListener',
          'elasticloadbalancing:AddListenerCertificates',
          'elasticloadbalancing:RemoveListenerCertificates',
          'elasticloadbalancing:ModifyRule',
        ],
        resources: ['*'],
      }),
    );

    new HelmChart(scope, 'HelmChart', {
      cluster: platform.cluster,
      namespace: namespace.name,
      repository: 'https://aws.github.io/eks-charts',
      chart: 'aws-load-balancer-controller',
      release: 'aws-load-balancer-controller',
      version: this.props.version ?? '1.2.0',
      values: {
        clusterName: platform.cluster.clusterName,
        region,
        vpcId: platform.cluster.vpc.vpcId,
        serviceAccount: {
          create: false,
          name: serviceAccount.name,
        },
      },
    });

    //chart.node.addDependency(namespace);
  }

  public get name(): string {
    return AwsLoadBalancerControllerAddon.NAME;
  }
}
