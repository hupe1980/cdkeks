import { ICertificate } from '@aws-cdk/aws-certificatemanager';
import { IConnectable, Connections, ISecurityGroup, SecurityGroup } from '@aws-cdk/aws-ec2';
import { IpAddressType, SslPolicy } from '@aws-cdk/aws-elasticloadbalancingv2';
import { Construct, Lazy, Tags, Names } from '@aws-cdk/core';
import * as cdk8s from 'cdk8s';
import * as kplus from 'cdk8s-plus-17';

import { Cdk8sConstruct, Cdk8sConstructProps } from './cdk8s-construct';
import { Service } from './service';
import { generateMetadata } from './utils';

export interface AlbIngressProps extends Cdk8sConstructProps {
  /**
   * Security Group to assign to this instance
   *
   * @default - create new security group
   */
  readonly securityGroup?: ISecurityGroup;

  /**
   * @default AlbTargetType.INSTANCE
   */
  readonly targetType?: TargetType;

  /**
   * Whether the load balancer has an internet-routable address
   *
   * @default false
   */
  readonly internetFacing?: boolean;

  /**
   * The type of IP addresses to use
   *
   * Only applies to application load balancers.
   *
   * @default IpAddressType.Ipv4
   */
  readonly ipAdressType?: IpAddressType;

  /**
   * @default SslPolicy.RECOMMENDED
   */
  readonly sslPolicy?: SslPolicy;

  /**
   * Certificates to attach
   */
  readonly certificates?: ICertificate[];

  readonly rules?: kplus.IngressV1Beta1Rule[];

  /**
   * Tags that will be applied to AWS resources created.
   */
  readonly tags?: Record<string, string>;
}

export class AlbIngress extends Cdk8sConstruct implements IConnectable {
  public readonly apiObject: kplus.IngressV1Beta1;

  /**
   * Allows specify security group connections for the instance.
   */
  public readonly connections: Connections;

  private readonly securityGroup: ISecurityGroup;
  private readonly securityGroups: ISecurityGroup[] = [];

  constructor(scope: Construct, id: string, props: AlbIngressProps) {
    super(scope, id, props);

    if (props.securityGroup) {
      this.securityGroup = props.securityGroup;
    } else {
      this.securityGroup = new SecurityGroup(this, 'SecurityGroup', {
        vpc: this.platform.cluster.vpc,
        description: `Automatically created Security Group for ELB ${Names.uniqueId(this)}`,
        allowAllOutbound: false,
      });
    }

    this.connections = new Connections({ securityGroups: [this.securityGroup] });
    this.securityGroups.push(this.securityGroup);

    const securityGroupsToken = Lazy.string({ produce: () => this.securityGroups.map((sg) => sg.securityGroupId).join(',') });

    const annotations: Record<string, string> = {
      'kubernetes.io/ingress.class': 'alb',
      'alb.ingress.kubernetes.io/target-type': props.targetType ?? TargetType.INSTANCE,
      'alb.ingress.kubernetes.io/scheme': props.internetFacing ? 'internet-facing' : 'internal',
      'alb.ingress.kubernetes.io/security-groups': securityGroupsToken,
      'alb.ingress.kubernetes.io/ip-address-type': props.ipAdressType ?? IpAddressType.IPV4,
      'alb.ingress.kubernetes.io/ssl-policy': props.sslPolicy ?? SslPolicy.RECOMMENDED,
    };

    if (props.tags) {
      const tags = [];
      for (const [key, value] of Object.entries(props.tags)) {
        Tags.of(this).add(key, value);
        tags.push(`${key}=${value}`);
      }
      annotations['alb.ingress.kubernetes.io/tags'] = tags.join(',');
    }

    if (props.certificates && props.certificates.length > 0) {
      annotations['alb.ingress.kubernetes.io/certificate-arn'] = props.certificates.map((cert) => cert.certificateArn).join(',');
    }

    this.apiObject = new kplus.IngressV1Beta1(this.chart, 'ingress', {
      metadata: generateMetadata(props.metadata, annotations),
      rules: props.rules,
    });
  }

  public addRule(path: string, backend: kplus.IngressV1Beta1Backend): void {
    this.apiObject.addRule(path, backend);
  }

  /**
   * Add the security group to the instance.
   *
   * @param securityGroup: The security group to add
   */
  public addSecurityGroup(securityGroup: ISecurityGroup): void {
    this.securityGroups.push(securityGroup);
  }

  public get name(): string {
    return this.apiObject.name;
  }

  public get metadata(): cdk8s.ApiObjectMetadataDefinition {
    return this.apiObject.metadata;
  }
}

export class IngressBackend {
  public static fromService(service: Service, options: kplus.ServiceIngressV1BetaBackendOptions = {}): kplus.IngressV1Beta1Backend {
    return kplus.IngressV1Beta1Backend.fromService(service.apiObject, options);
  }
}

/**
 * How to interpret the load balancing target identifiers
 */
export enum TargetType {
  /**
   * Targets identified by IP address
   */
  IP = 'ip',

  /**
   * Targets identified by instance ID
   */
  INSTANCE = 'instance',
}
