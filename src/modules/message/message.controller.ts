import { Controller, Get, Param } from '@nestjs/common';
import { MessageService } from './message.service';

import { MessageCode, Message } from '../../services/messages';

@Controller('/message')
export class MessageController {
  constructor(private readonly messageService: MessageService) {}

  @Get(':id')
  getMessage(@Param('id') id: MessageCode): Message {
    return this.messageService.getMessage(id);
  }
}
