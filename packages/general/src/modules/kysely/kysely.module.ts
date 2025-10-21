import { DynamicModule, Module, Provider } from '@nestjs/common';

import { KYSELY_MODULE_OPTIONS } from './constants';
import {
  KyselyModuleAsyncOptions,
  KyselyModuleOptions,
  KyselyOptionsFactory,
} from './interfaces';
import { KyselyService } from './kysely.service';

@Module({
  providers: [KyselyService],
  exports: [KyselyService],
})
export class KyselyModule {
  static forRoot(options: KyselyModuleOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: KyselyModule,
      providers: [
        {
          provide: KYSELY_MODULE_OPTIONS,
          useValue: options,
        },
      ],
    };
  }

  static forRootAsync(options: KyselyModuleAsyncOptions): DynamicModule {
    return {
      global: options.isGlobal,
      module: KyselyModule,
      imports: options.imports || [],
      providers: [
        ...this.createAsyncProviders(options),
        ...(options.extraProviders ?? []),
      ],
    };
  }

  private static createAsyncProviders(
    options: KyselyModuleAsyncOptions,
  ): Provider[] {
    // if (options.useExisting || options.useFactory) {
    //   return [this.createAsyncOptionsProvider(options)];
    // }
    // return [
    //   this.createAsyncOptionsProvider(options),
    //   {
    //     provide: options.useClass,
    //     useClass: options.useClass,
    //   },
    // ];
    const providers: Provider[] = [this.createAsyncOptionsProvider(options)];

    if (options.useClass) {
      providers.push({
        provide: options.useClass,
        useClass: options.useClass,
      });
    }

    return providers;
  }

  private static createAsyncOptionsProvider(
    options: KyselyModuleAsyncOptions,
  ): Provider {
    if (options.useFactory) {
      return {
        provide: KYSELY_MODULE_OPTIONS,
        useFactory: options.useFactory,
        inject: options.inject || [],
      };
    }
    return {
      provide: KYSELY_MODULE_OPTIONS,
      useFactory: async (optionsFactory: KyselyOptionsFactory) =>
        await optionsFactory.createKyselyOptions(),
      // inject: [options?.useExisting || options?.useClass],
      inject: options.useExisting
        ? [options.useExisting]
        : options.useClass
          ? [options.useClass]
          : [],
    };
  }
}
