import { lowerCase } from 'lodash';
import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import cuid from 'cuid';
import { SessionMiddleware } from './session.middleware';
import { CONTEXT_REQUEST_ID, HTTP_HEADER_REQUEST_ID } from './constants';

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  // eslint-disable-next-line class-methods-use-this
  public use(req: Request, res: Response, next: NextFunction): void {
    // make sure this is lower-cased, otherwise downstream stuff will barf.
    const lowerRequestId = lowerCase(HTTP_HEADER_REQUEST_ID);

    const requestIdHeader = req.header(lowerRequestId) || cuid();

    SessionMiddleware.set(CONTEXT_REQUEST_ID, requestIdHeader);

    req.headers[lowerRequestId] = requestIdHeader;

    res.set(HTTP_HEADER_REQUEST_ID, requestIdHeader);

    next();
  }
}
