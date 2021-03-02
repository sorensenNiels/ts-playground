import { LogLevel } from '@nestjs/common';

export type MessageCode = string | number;
export type MessagePrimitive = string;
export type MessageParams = Record<string, unknown>;

export type MessageLogLevel = LogLevel;

export type MessageExtended = {
  message: MessagePrimitive;
  logLevel?: MessageLogLevel;
};

export type MessageInstance = MessagePrimitive | MessageExtended;

export type MessageReposObj = Record<MessageCode, MessageInstance>;

export type MessageRepos = MessageReposObj;

export type Message = {
  code: MessageCode;
  message: MessagePrimitive;
  params?: MessageParams;
  logLevel?: MessageLogLevel;
};
