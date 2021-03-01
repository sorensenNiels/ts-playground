import async from 'async';
import { template, isString } from 'lodash';
import { Injectable } from '@nestjs/common';

import {
  MessagePrimitive,
  MessageParams,
  Message,
  MessageRepos,
  MessageCode,
  MessageReposObj,
  MessageInstance,
  MessageExtended
} from './messages.interface';

@Injectable()
export class MessagesService {
  #repos: MessageRepos = {};

  private interpolateMessage(str: string, params?: MessageParams) {
    const compiled = template(str);
    return compiled(params || {});
  }

  public async registerRepos(repos: MessageRepos): Promise<void> {
    await async.eachOfLimit(repos, 1, async (message, code) => {
      this.addMessageToRepos(code, message);
    });
  }

  private addMessageToRepos(code: MessageCode, message: MessageInstance): void {
    if (code in this.#repos) {
      throw new Error(
        `None unique message code identified during MesageRepos creation ${code}`
      );
    }

    this.#repos[code] = message;
  }

  getMessagePrimitive(
    messageCode: MessageCode,
    params?: MessageParams
  ): MessagePrimitive {
    const repos: MessageRepos = this.#repos;
    const msg = (repos as MessageReposObj)[messageCode];
    if (msg) {
      return isString(msg)
        ? this.interpolateMessage(msg, params)
        : this.interpolateMessage(msg.message, params);
    }

    throw new Error(`Failed to resolve message with code ${messageCode}`);
  }

  getMessage(messageCode: MessageCode, params?: MessageParams): Message {
    const repos: MessageRepos = this.#repos;
    const msg = (repos as MessageReposObj)[messageCode];
    if (msg) {
      return {
        code: messageCode,
        message: isString(msg)
          ? this.interpolateMessage(msg, params)
          : this.interpolateMessage(msg.message, params),
        params,
        logLevel: (msg as MessageExtended).logLevel || 'error'
      };
    }

    throw new Error(`Failed to resolve message with code ${messageCode}`);
  }
}
