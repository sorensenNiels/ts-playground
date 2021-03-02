import async from 'async';
import { template, isString } from 'lodash';

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

export class MessagesService {
  #repos: MessageRepos = {};

  private static instance: MessagesService;

  public static getInstance(): MessagesService {
    if (!MessagesService.instance) {
      MessagesService.instance = new MessagesService();
    }

    return MessagesService.instance;
  }

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  private interpolateMessage(str: string, params?: MessageParams) {
    const compiled = template(str);
    return compiled(params || {});
  }

  private addMessageToRepos(code: MessageCode, message: MessageInstance): void {
    if (code in this.#repos) {
      throw new Error(
        `None unique message code identified during MesageRepos creation ${code}`
      );
    }

    this.#repos[code] = message;
  }

  public async registerRepos(repos: MessageRepos): Promise<void> {
    await async.eachOfLimit(repos, 1, async (message, code) => {
      this.addMessageToRepos(code, message);
    });
  }

  public hasMessage(code: MessageCode): boolean {
    return !!this.#repos[code];
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
