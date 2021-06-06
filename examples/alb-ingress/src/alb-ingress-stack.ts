import { Cluster, KubernetesVersion } from '@aws-cdk/aws-eks';
import { Role, AccountRootPrincipal } from '@aws-cdk/aws-iam';
import { Construct, Stack, StackProps } from '@aws-cdk/core';

import { IngressBackend, AlbIngress, TargetType, AwsCalicoAddon, AwsLoadBalancerControllerAddon, Deployment, Platform } from 'cdkeks';

export class AlbIngressStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const adminRole = new Role(this, 'AdminRole', {
      roleName: 'ClusterAdmin',
      assumedBy: new AccountRootPrincipal(),
    });

    const cluster = new Cluster(this, 'Cluster', {
      clusterName: 'cloudcomponents',
      version: KubernetesVersion.V1_20,
    });

    cluster.awsAuth.addMastersRole(adminRole);

    const platform = new Platform(this, 'Platform', {
      cluster,
      addons: [new AwsCalicoAddon(), new AwsLoadBalancerControllerAddon()],
    });

    const deployment = new Deployment(this, 'Deployment', {
      platform,
      containers: [
        {
          image: 'nginx',
        },
      ],
    });

    // eslint-disable-next-line no-constant-condition
    if (false) {
      const backend = IngressBackend.fromService(deployment.expose('Service', 80));

      const ingress = new AlbIngress(this, 'Ingress', {
        platform,
        targetType: TargetType.IP,
        internetFacing: true,
      });

      ingress.addRule('/', backend);
    }
  }
}
