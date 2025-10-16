import { Module } from '@nestjs/common';

import { AssetResolver } from './asset.resolver';
import { AssetService } from './asset.service';

@Module({
  imports: [],
  providers: [AssetService, AssetResolver],
  exports: [AssetService],
})
export class AssetModule {}
