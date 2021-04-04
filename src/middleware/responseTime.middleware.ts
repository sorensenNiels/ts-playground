import { Injectable, NestMiddleware, Logger } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import responseTime, { ResponseTimeOptions } from '../packages/response-time';

@Injectable()
export class ResponseTimeMiddleware implements NestMiddleware {
  private readonly logger = new Logger(ResponseTimeMiddleware.name);

  public static configure(opts: ResponseTimeOptions): void {
    this.options = opts;
  }

  private static options: ResponseTimeOptions;

  // eslint-disable-next-line class-methods-use-this
  public use(req: Request, res: Response, next: NextFunction): void {
    if (ResponseTimeMiddleware.options) {
      responseTime(ResponseTimeMiddleware.options)(req, res, next);
    } else {
      responseTime()(req, res, next);
    }
  }
}
