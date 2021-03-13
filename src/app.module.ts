import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { SharedModule } from './shared/shared.module';
import { MessageModule } from './modules/message/message.module';

import { SessionMiddleware, RequestIdMiddleware, ResponseTimeMiddleware } from './middleware';
@Module({
  imports: [MessageModule, SharedModule],
  controllers: [AppController],
  providers: [AppService]
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer): MiddlewareConsumer | void {
    consumer.apply(SessionMiddleware).forRoutes('*');
    consumer.apply(RequestIdMiddleware).forRoutes('*');
    consumer.apply(ResponseTimeMiddleware).forRoutes('*');
  }
}
