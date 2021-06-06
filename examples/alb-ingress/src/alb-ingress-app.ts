#!/usr/bin/env node

import 'source-map-support/register';
import { App } from '@aws-cdk/core';

import { AlbIngressStack } from './alb-ingress-stack';

const app = new App();

new AlbIngressStack(app, 'AlbIngressStack', {
  env: {
    region: process.env.DEFAULT_REGION,
    account: process.env.CDK_DEFAULT_ACCOUNT,
  },
});
