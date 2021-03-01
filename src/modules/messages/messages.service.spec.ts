import { Test, TestingModule } from '@nestjs/testing';
import { MessagesService } from './messages.service';

import ExceptionTypes from './message-repos/exception-types.messages';

describe('MessagesService', () => {
  let messagesService: MessagesService;

  beforeEach(async () => {
    const app: TestingModule = await Test.createTestingModule({
      controllers: [],
      providers: [MessagesService]
    }).compile();

    messagesService = app.get<MessagesService>(MessagesService);
  });

  describe('messages.service', () => {
    it('should be defined"', () => {
      expect(messagesService).toBeDefined();
      //   expect(appController.getHello()).toBe('Hello World!');
    });

    it('should return correct message text only', () => {
      const message = messagesService.getMessagePrimitive(
        ExceptionTypes.API_ERROR
      );
      expect(message).toBe('Api server error');
    });

    it('should return correct message object', () => {
      const message = messagesService.getMessage(ExceptionTypes.API_ERROR);
      expect(message).toBeDefined();
      expect(message.code).toBe('api_error');
    });
  });
});
