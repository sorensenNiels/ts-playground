import { Global, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';

import { ExceptionTypesMessages, GlobalMessages } from './messages';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [MessagesService, ExceptionTypesMessages, GlobalMessages]
})
export class MessagesModule {}
