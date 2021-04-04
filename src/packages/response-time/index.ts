import { Request, Response, NextFunction } from 'express';
import onHeaders from 'on-headers';

export type ResponseTimeOptions = {
  digits: number;
  header: string;
  suffix: boolean;
};

export type ResponseTimeOptionsFunction = (req: Request, res: Response, time: number) => void;

const defaultOptions: ResponseTimeOptions = {
  digits: 3,
  header: 'X-Response-Time',
  suffix: true
};

/**
 * Create a middleware to add a `X-Response-Time` header displaying
 * the response duration in milliseconds.
 *
 * @param {object|function} [options]
 * @param {number} [options.digits=3]
 * @param {string} [options.header=X-Response-Time]
 * @param {boolean} [options.suffix=true]
 * @return {function}
 * @public
 */

const responseTime = (options?: ResponseTimeOptions | ResponseTimeOptionsFunction) => {
  const opts = options;

  // get the function to invoke
  const fn = typeof opts !== 'function' ? createSetHeader(opts) : opts;

  return function responseTime(req: Request, res: Response, next: NextFunction) {
    const startAt = process.hrtime();

    onHeaders(res, function onHeaders() {
      const diff = process.hrtime(startAt);
      const time = diff[0] * 1e3 + diff[1] * 1e-6;

      fn(req, res, time);
    });

    next();
  };
};

const createSetHeader = (options?: ResponseTimeOptions) => {
  // response time digits
  const digits = options?.digits !== undefined ? options.digits : defaultOptions.digits;

  // header name
  const header = options?.header || defaultOptions.header;

  // display suffix
  const suffix = options?.suffix !== undefined ? Boolean(options.suffix) : defaultOptions.suffix;

  return function setResponseHeader(req: Request, res: Response, time: number) {
    if (res.getHeader(header)) {
      return;
    }

    let val = time.toFixed(digits);

    if (suffix) {
      val += 'ms';
    }

    res.setHeader(header, val);
  };
};

export default responseTime;
