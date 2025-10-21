import { ConfigurableModuleAsyncOptions, Provider, Type } from '@nestjs/common';
import { KyselyConfig } from 'kysely';

export interface KyselyModuleOptions extends KyselyConfig {
  isGlobal?: boolean;
}

export interface KyselyOptionsFactory {
  createKyselyOptions():
    | Promise<Omit<KyselyModuleOptions, 'isGlobal'>>
    | Omit<KyselyModuleOptions, 'isGlobal'>;
}

export interface KyselyModuleAsyncOptions
  extends ConfigurableModuleAsyncOptions<
    Omit<KyselyModuleOptions, 'isGlobal'>,
    keyof KyselyOptionsFactory
  > {
  isGlobal?: boolean;
  useExisting?: Type<KyselyOptionsFactory>;
  useClass?: Type<KyselyOptionsFactory>;
  useFactory?: (
    ...args: any[]
  ) =>
    | Promise<Omit<KyselyModuleOptions, 'isGlobal'>>
    | Omit<KyselyModuleOptions, 'isGlobal'>;
  inject?: any[];
  extraProviders?: Provider[];
}
