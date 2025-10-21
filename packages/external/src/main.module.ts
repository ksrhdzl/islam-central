import { Module } from '@nestjs/common';
import { DatabaseModule } from 'general';

import { AppModule } from './app';

@Module({
  imports: [DatabaseModule, AppModule],
})
export class MainModule {}
