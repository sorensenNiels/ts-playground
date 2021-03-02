import { Injectable } from '@nestjs/common';
import { MessagesService, MessageCode, Message } from '../../services/messages';

@Injectable()
export class MessageService {
  constructor(private messagesService: MessagesService) {}

  getMessage(messageCode: MessageCode): Message {
    return this.messagesService.getMessage(messageCode);
  }
}
