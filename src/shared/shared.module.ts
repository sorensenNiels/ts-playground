import { Module, Global } from '@nestjs/common';

import { MessagesService } from '../services/messages/messages.service';

const PROVIDERS = [
  {
    provide: MessagesService,
    useFactory: () => {
      return MessagesService.getInstance();
    }
  }
];

@Global()
@Module({
  imports: [],
  providers: [...PROVIDERS],
  exports: [...PROVIDERS]
})
export class SharedModule {}
