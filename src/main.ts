import { Logger } from 'nestjs-pino';
import { NestFactory } from '@nestjs/core';

import { getNodeEnv, isDevelopment } from './services/config';

import { ConfigService } from './services/config';
import { AppModule } from './app.module';

async function bootstrap() {
  const appOptions = isDevelopment() ? {} : { logger: false };

  const app = await NestFactory.create(AppModule, appOptions);

  const logger = app.get(Logger);

  app.useLogger(logger);

  const config = app.get(ConfigService);
  const port = config.getNumber('httpPort', 3000);

  await app.listen(port, '0.0.0.0');
  logger.log(`Started application in '${getNodeEnv()}' on port ${port}`);
}

bootstrap();
