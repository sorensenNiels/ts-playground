import { Module, Global } from '@nestjs/common';
import { LoggerModule } from 'nestjs-pino';
import { ConfigService } from '../services/config';
import { MessagesService } from '../services/messages/messages.service';

import {} from '../messages';

const PROVIDERS = [
  {
    provide: ConfigService,
    useFactory: () => new ConfigService()
  },
  {
    provide: MessagesService,
    useFactory: () => MessagesService.getInstance()
  }
];

@Global()
@Module({
  imports: [
    LoggerModule.forRootAsync({
      imports: [],
      inject: [ConfigService],
      useFactory: async (config: ConfigService) => {
        return { pinoHttp: config.get('pinoHttp') };
      }
    })
  ],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS]
})
export class SharedModule {}
