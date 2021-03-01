import { MessageRepos } from '../messages.interface';
import { MessageReposCache } from './messages.repos';

enum Message {
  API_ERROR = 'api_error',
  VALIDATION_ERROR = 'validation_error',
  AUTHENTICATION_ERROR = 'authentication_error',
  API_CONNECTION_ERROR = 'api_connection_error',
  RATE_LIMIT_ERROR = 'rate_limit_error',
  IDEMPOTENCY_ERROR = 'idempotency_error',
  INVALID_REQUEST_ERROR = 'invalid_request_error'
}

const Repos: MessageRepos = {
  api_error: {
    message: 'Api server error'
  },
  validation_error: {
    message: 'Validation error'
  },
  authentication_error: {
    message: 'Authentication error'
  },
  api_connection_error: {
    message: 'Api connection error'
  },
  rate_limit_error: {
    message: 'Rate limit error occurred'
  },
  idempotency_error: {
    message: 'Idempotency error occurred'
  },
  invalid_request_error: {
    message: 'Invalid request error'
  }
};

Promise.resolve(MessageReposCache.registerRepos(Repos));

export default Message;
