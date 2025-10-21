import { Inject, Injectable, Logger } from '@nestjs/common';
import { Kysely } from 'kysely';

import { KYSELY_MODULE_OPTIONS } from './constants';
import { KyselyModuleOptions } from './interfaces';

@Injectable()
export class KyselyService<DB = any> extends Kysely<DB> {
  private readonly logger = new Logger(KyselyService.name);

  constructor(
    @Inject(KYSELY_MODULE_OPTIONS)
    options: Omit<KyselyModuleOptions, 'isGlobal'>,
  ) {
    super(options);
  }
}
