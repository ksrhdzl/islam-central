import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { MinioService } from 'general';
import { v7 as uuidv7 } from 'uuid';

import { PresignedAssetOutput } from './dto/asset.output';

@Injectable()
export class AssetService {
  constructor(
    private readonly minioService: MinioService,
    private readonly configService: ConfigService,
  ) {}

  async presignedAsset(): Promise<PresignedAssetOutput> {
    const uuid = uuidv7();
    const asset = await this.minioService.presignedPutObject(
      this.configService.get<string>('STORAGE_BUCKET')!,
      uuid,
      1200,
    );

    return {
      name: uuid,
      link: asset,
    };
  }
}
