import { UseGuards } from '@nestjs/common';
import { Mutation, Resolver } from '@nestjs/graphql';

import { AuthMiddleware } from '../auth/middlewares/auth.middleware';
import { AssetService } from './asset.service';
import { PresignedAssetOutput } from './dto/asset.output';

@Resolver()
export class AssetResolver {
  constructor(private readonly assetService: AssetService) {}

  @Mutation(() => PresignedAssetOutput)
  @UseGuards(AuthMiddleware)
  async presignedAsset(): Promise<PresignedAssetOutput> {
    const { name, link } = await this.assetService.presignedAsset();
    return {
      name: name,
      link: link,
    };
  }
}
