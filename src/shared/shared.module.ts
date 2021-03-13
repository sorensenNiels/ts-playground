import { Module, Global } from '@nestjs/common';

import { MessagesService } from '../services/messages/messages.service';

import {} from './messages';

const PROVIDERS = [
  {
    provide: MessagesService,
    useFactory: () => MessagesService.getInstance()
  }
];

@Global()
@Module({
  imports: [],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS]
})
export class SharedModule {}
