export type MessageCode = string | number;
export type MessagePrimitive = string;
export type MessageParams = Record<string, unknown>;

export type MessageInstance = {
  message: MessagePrimitive;
  params?: MessageParams;
};

export type ReposName = string;
export type ReposDomain = string;

type MessageReposMetaObj = {
  name: ReposName;
  domain: ReposDomain;
};

export type MessageReposObj = Record<MessageCode, MessageInstance>;
export type MessageReposMeta = { [K in 'meta']: MessageReposMetaObj };

export type MessageRepos = MessageReposObj;

export type Message = {
  code: MessageCode;
  message: MessagePrimitive;
  params?: MessageParams;
};
