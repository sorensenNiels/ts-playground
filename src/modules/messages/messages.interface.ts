export type MessageCode = string | number;
export type MessagePrimitive = string;
export type MessageParams = Record<string, unknown>;

export type MessageInstance = MessagePrimitive;

export type ReposName = string;
export type ReposDomain = string;

export type MessageReposObj = Record<MessageCode, MessageInstance>;

export type MessageRepos = MessageReposObj;

export type Message = {
  code: MessageCode;
  message: MessagePrimitive;
  params?: MessageParams;
};
