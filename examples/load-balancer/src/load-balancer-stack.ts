import { Cluster, KubernetesVersion } from '@aws-cdk/aws-eks';
import { Role, AccountRootPrincipal } from '@aws-cdk/aws-iam';
import { Construct, Stack, StackProps } from '@aws-cdk/core';
import * as kplus from 'cdk8s-plus-17';

import { AwsCalicoAddon, Deployment, Platform } from 'cdkeks';

export class LoadBalancerStack extends Stack {
  constructor(scope: Construct, id: string, props: StackProps) {
    super(scope, id, props);

    const adminRole = new Role(this, 'AdminRole', {
      roleName: 'ClusterAdmin',
      assumedBy: new AccountRootPrincipal(),
    });

    const cluster = new Cluster(this, 'Cluster', {
      clusterName: 'cdkeks-load-balancer',
      version: KubernetesVersion.V1_20,
    });

    cluster.awsAuth.addMastersRole(adminRole);

    const platform = new Platform(this, 'Platform', {
      cluster,
      addons: [new AwsCalicoAddon()],
    });

    const deployment = new Deployment(this, 'Deployment', {
      platform,
      containers: [
        {
          image: 'nginx',
        },
      ],
    });

    deployment.expose('LoadBalancer', 80, {
      serviceType: kplus.ServiceType.LOAD_BALANCER,
    });
  }
}
