import async from 'async';
import {
  MessageRepos,
  MessageInstance,
  MessageCode
} from '../messages.interface';

export class MessageReposCache {
  private static instance: MessageReposCache;

  #repos: MessageRepos = {};

  // eslint-disable-next-line @typescript-eslint/no-empty-function
  private constructor() {}

  public static getInstance(): MessageReposCache {
    if (!MessageReposCache.instance) {
      MessageReposCache.instance = new MessageReposCache();
    }

    return MessageReposCache.instance;
  }

  public static async registerRepos(repos: MessageRepos): Promise<void> {
    const instance = MessageReposCache.getInstance();

    await async.eachOfLimit(repos, 1, async (message, code) => {
      instance.addMessageToRepos(code, message);
    });
  }

  public static getRepos(): MessageRepos {
    const instance = MessageReposCache.getInstance();
    return instance.#repos;
  }

  private addMessageToRepos(code: MessageCode, message: MessageInstance): void {
    if (code in this.#repos) {
      throw new Error(
        `None unique message code identified during MesageRepos creation ${code}`
      );
    }

    this.#repos[code] = message;
  }
}
