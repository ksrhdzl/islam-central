import { Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import {
  ExpressAdapter,
  NestExpressApplication,
} from '@nestjs/platform-express';

import { AppModule } from './app.module';

void (async (): Promise<void> => {
  const adapter = new ExpressAdapter();
  const app = await NestFactory.create<NestExpressApplication>(
    AppModule,
    adapter,
  );

  app.enableCors({ origin: '*', credentials: true });

  const configService = app.get(ConfigService);

  app.enableShutdownHooks();
  await app.listen(
    configService.get<number>('NODE_PORT')!,
    '0.0.0.0',
    (): void => {
      void (async (): Promise<void> => {
        try {
          Logger.log(
            `Application is running on: ${await app.getUrl()} ${configService
              .get<string>('NODE_ENV')!
              .toUpperCase()} `,
          );
        } catch (error) {
          Logger.error('Failed to log app URL:', error);
        }
      })();
    },
  );
})();
