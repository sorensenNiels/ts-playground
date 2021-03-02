import { ExceptionTypesMessages, GlobalMessages } from './messages';

import { Global, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [MessagesService, ExceptionTypesMessages, GlobalMessages]
})
export class MessagesModule {}
