import { MessageRepos } from './messages.interface';
import { MessagesService } from './messages.service';

export enum TestMessages {
  API_ERROR = 'api_error',
  VALIDATION_ERROR = 'validation_error',
  AUTHENTICATION_ERROR = 'authentication_error',
  API_CONNECTION_ERROR = 'api_connection_error',
  RATE_LIMIT_ERROR = 'rate_limit_error',
  IDEMPOTENCY_ERROR = 'idempotency_error',
  INVALID_REQUEST_ERROR = 'invalid_request_error'
}

const testMessageRepos: MessageRepos = {
  api_error: 'Api server error',
  validation_error: 'Validation error',
  authentication_error: 'Authentication error',
  api_connection_error: 'Api connection error',
  rate_limit_error: 'Rate limit error occurred',
  idempotency_error: 'Idempotency error occurred',
  invalid_request_error: 'Invalid request error'
};

describe('MessagesService', () => {
  const messagesService = MessagesService.getInstance();
  messagesService.registerRepos(testMessageRepos);

  // beforeEach(async () => {
  // });

  describe('messages.service', () => {
    it('should be defined"', () => {
      expect(messagesService).toBeDefined();
    });

    it('should return correct message text only', () => {
      const message = messagesService.getMessagePrimitive(
        TestMessages.API_ERROR
      );
      expect(message).toBe('Api server error');
    });

    it('should return correct message object', () => {
      const message = messagesService.getMessage(TestMessages.API_ERROR);
      expect(message).toBeDefined();
      expect(message.code).toBe('api_error');
    });
  });
});
