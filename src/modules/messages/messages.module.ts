import { Global, Module } from '@nestjs/common';
import { MessagesService } from './messages.service';

@Global()
@Module({
  imports: [],
  controllers: [],
  providers: [MessagesService]
})
export class MessagesModule {}
