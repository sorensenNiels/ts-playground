import { MessageRepos } from '../messages.interface';
import { MessagesService } from '../messages.service';

export enum GlobalMessage {
  SYNCH_REQUEST_FAILED = 'synch_request_failed',
  SYNCH_NO_RESPONSE = 'synch_no_reponse',
  SYNCH_RESPONSE_NOT_SUCCESSFUL = 'synch_reponse_not_successful',
  SYNCH_XML_PARSE_FAILED = 'synch_xml_parse_failed',
  SYNCH_INVALID_HTTP_STATUS = 'synch_invalid_http_status',
  SYNCH_FAILED_TO_OBTAIN_INTERNAL_ACCESS_TOKEN = 'synch_failed_to_obtain_internal_access_token',
  SYNCH_FAILED_TO_VALIDATE_ACCESS_TOKEN = 'synch_failed_to_validate_access_token',
  SYNCH_FAILED_TO_UPDATE_REFERENCE_TABLE = 'synch_failed_to_update_reference_table',
  SYNCH_REFERENCE_TABLE_HAS_NO_ROWS = 'synch_reference_table_has_no_rows',
  SYNCH_FAILED_TO_PARSE_ACCESS_TOKEN = 'synch_failed_to_parse_access_token',
  SYNCH_RESPONSE_RETURNED_ERROR = 'synch_response_returned_error'
}

const repos: MessageRepos = {
  synch_request_failed: 'Request to Synchronicer back-end failed - ${msg}',
  synch_no_response: 'No response returned from Synchronicer - ${msg}',
  synch_response_not_successful:
    'Response received from Synchronicer did not return status equal "success"',
  synch_xml_parse_failed:
    'Failed to parse XML document provided by Synchronicer back-end - ${msg}',
  synch_invalid_http_status:
    'Invalid HTTP status returned by Synchronicer - ${status}',
  synch_failed_to_obtain_internal_access_token:
    'Failed to obtain internal access token',
  synch_failed_to_validate_access_token:
    'Failed to validate access token - ${accessToken}',
  synch_failed_to_update_reference_table:
    'Failed to update reference table - ${msg}',
  synch_reference_table_has_no_rows:
    'Reference table does not hold any rows - ${referenceTableId}',
  synch_failed_to_parse_access_token: 'Failed to parse access token',
  synch_response_returned_error:
    'Response received from Synchronicer was in error - ${messages}'
};

const messagesService = MessagesService.getInstance();
messagesService.registerRepos(repos);
