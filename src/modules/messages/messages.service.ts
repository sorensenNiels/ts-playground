import { isString, template } from 'lodash';
import { Injectable } from '@nestjs/common';

import {
  MessagePrimitive,
  MessageParams,
  Message,
  MessageRepos,
  MessageCode,
  MessageReposObj
} from './messages.interface';

import { MessageReposCache } from './message-repos/messages.repos';

@Injectable()
export class MessagesService {
  private interpolateMessage(str: string, params?: MessageParams) {
    const compiled = template(str);
    return compiled(params || {});
  }

  getMessagePrimitive(
    messageCode: MessageCode,
    params?: MessageParams
  ): MessagePrimitive {
    const repos: MessageRepos = MessageReposCache.getRepos();
    const msg = (repos as MessageReposObj)[messageCode];
    if (msg) {
      return isString(msg)
        ? this.interpolateMessage(msg, params)
        : this.interpolateMessage(msg.message, params);
    }

    throw new Error(`Failed to resolve message with code ${messageCode}`);
  }

  getMessage(messageCode: MessageCode, params?: MessageParams): Message {
    const repos: MessageRepos = MessageReposCache.getRepos();
    const msg = (repos as MessageReposObj)[messageCode];
    if (msg) {
      return {
        code: messageCode,
        message: isString(msg)
          ? this.interpolateMessage(msg, params)
          : this.interpolateMessage(msg.message, params),
        params
      };
    }

    throw new Error(`Failed to resolve message with code ${messageCode}`);
  }
}
