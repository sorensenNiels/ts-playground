import cls from 'cls-hooked';
import { Injectable, NestMiddleware } from '@nestjs/common';

import { NextFunction, Request, Response } from 'express';
import { CONTEXT_NAMESPACE } from './constants';

@Injectable()
export class SessionMiddleware implements NestMiddleware {
  public static createDefault(): cls.Namespace {
    return cls.getNamespace(CONTEXT_NAMESPACE) || cls.createNamespace(CONTEXT_NAMESPACE);
  }

  public static get<T = unknown>(key: string): T | null {
    const session = cls.getNamespace(CONTEXT_NAMESPACE);
    if (!session) {
      return null;
    }

    return session.get(key);
  }

  public static set<T = unknown>(key: string, value: T): void {
    const session = cls.getNamespace(CONTEXT_NAMESPACE);
    if (!session) {
      return;
    }

    session.set(key, value);
  }

  // eslint-disable-next-line class-methods-use-this
  public use(req: Request, res: Response, next: NextFunction): void {
    const session = SessionMiddleware.createDefault();

    session.run(async () => {
      next();
    });
  }
}
