import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';

@Injectable()
export class IdempotencyMiddleware implements NestMiddleware {
  // public static configure(opts: IdempotencyMiddlewareOptions): void {
  //   this.options = opts;
  // }

  // private static options: IdempotencyMiddlewareOptions

  public use(req: Request, res: Response, next: NextFunction): void {}
}
