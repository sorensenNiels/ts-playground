import { MessageRepos } from '../messages.interface';

import { MessageReposCache } from '../messages.repos';

enum Message {
  SYNCH_REQUEST_FAILED = 5000,
  SYNCH_NO_RESPONSE = 5001,
  SYNCH_RESPONSE_NOT_SUCCESSFUL = 5002,
  SYNCH_XML_PARSE_FAILED = 5003,
  SYNCH_INVALID_HTTP_STATUS = 5004,
  SYNCH_FAILED_TO_OBTAIN_INTERNAL_ACCESS_TOKEN = 5005,
  SYNCH_FAILED_TO_VALIDATE_ACCESS_TOKEN = 5006,
  SYNCH_FAILED_TO_UPDATE_REFERENCE_TABLE = 5007,
  SYNCH_REFERENCE_TABLE_HAS_NO_ROWS = 5008,
  SYNCH_FAILED_TO_PARSE_ACCESS_TOKEN = 5009,
  SYNCH_RESPONSE_RETURNED_ERROR = 5010
}

const Repos: MessageRepos = {
  5000: {
    message: 'Request to Synchronicer back-end failed - ${msg}'
  },
  5001: {
    message: 'No response returned from Synchronicer - ${msg}'
  },
  5002: {
    message:
      'Response received from Synchronicer did not return status equal "success"'
  },
  5003: {
    message:
      'Failed to parse XML document provided by Synchronicer back-end - ${msg}'
  },
  5004: {
    message: 'Invalid HTTP status returned by Synchronicer - ${status}'
  },
  5005: {
    message: 'Failed to obtain internal access token'
  },
  5006: {
    message: 'Failed to validate access token - ${accessToken}'
  },
  5007: {
    message: 'Failed to update reference table - ${msg}'
  },
  5008: {
    message: 'Reference table does not hold any rows - ${referenceTableId}'
  },
  5009: {
    message: 'Failed to parse access token'
  },
  5010: {
    message: 'Response received from Synchronicer was in error - ${messages}'
  }
};

Promise.resolve(MessageReposCache.registerRepos(Repos));

export default Message;
