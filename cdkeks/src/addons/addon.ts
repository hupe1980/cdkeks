import { Construct } from 'constructs';

import { Platform } from '../platform';

export interface IAddon {
  readonly name: string;
  install(scope: Construct, platform: Platform): void;
}
