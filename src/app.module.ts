import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SharedModule } from './shared/shared.module';
import { MessageModule } from './modules/message/message.module';

@Module({
  imports: [MessageModule, SharedModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule {}
