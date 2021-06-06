import { Cluster, KubernetesVersion } from '@aws-cdk/aws-eks';
import { Stack } from '@aws-cdk/core';
import 'jest-cdk-snapshot';

import { Platform } from '../platform';

test('default setup', (): void => {
  const stack = new Stack();

  const cluster = new Cluster(stack, 'Cluster', {
    version: KubernetesVersion.V1_20,
  });

  new Platform(stack, 'Platform', {
    cluster,
  });

  expect(stack).toMatchCdkSnapshot({
    ignoreAssets: true,
  });
});
