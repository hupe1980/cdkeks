#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { LoadBalancerStack } from './load-balancer-stack';

const app = new App();

new LoadBalancerStack(app, 'LoadBalancerStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
