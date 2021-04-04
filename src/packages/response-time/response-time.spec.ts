/* eslint-disable @typescript-eslint/ban-types */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { Request, Response } from 'express';
import request from 'supertest';
import http from 'http';

import { after } from '../../utilities';

import responseTime, { ResponseTimeOptions, ResponseTimeOptionsFunction } from '.';

describe('responseTime()', function () {
  it('should send X-Response-Time header', function (done) {
    const server = createServer();
    request(server)
      .get('/')
      .expect('X-Response-Time', /^[0-9.]+ms$/, done);
  });

  it('should not override X-Response-Time header', function (done) {
    const server = createServer(undefined, function (req: Request, res: Response) {
      res.setHeader('X-Response-Time', 'bogus');
    });

    request(server).get('/').expect('X-Response-Time', 'bogus', done);
  });

  describe('with "digits"', function () {
    it('should default to 3', function (done) {
      const server = createServer();
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{3}ms$/, done);
    });
  });
});

describe('responseTime(fn)', function () {
  it('should call fn with response time', function (done) {
    const cb = after(2, done);
    const start = process.hrtime();
    const server = createServer((req: Request, res: Response, time: number) => {
      const diff = process.hrtime(start);
      const max = diff[0] * 1e3 + diff[1] * 1e-6;
      expect(req.url).toBe('/');
      expect(res.statusCode).toBe(200);
      expect(time >= 0).toBeTruthy();
      expect(time <= max).toBeTruthy();
      // assert.equal(req.url, '/');
      // assert.equal(res.statusCode, 200);
      // assert.ok(time >= 0);
      // assert.ok(time <= max);
      cb();
    });

    request(server).get('/').expect(200, cb);
  });

  it('should not send X-Response-Time header', function (done) {
    const cb = after(2, done);
    const server = createServer(function () {
      cb();
    });

    request(server).get('/').expect(shouldNotHaveHeader('X-Response-Time')).expect(200, cb);
  });
});

describe('responseTime(options)', function () {
  describe('with "digits" option', function () {
    it('should default to 3', function (done) {
      const server = createServer();
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{3}ms$/, done);
    });

    it('should allow custom digits', function (done) {
      const server = createServer({ digits: 5 } as ResponseTimeOptions);
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9]+\.[0-9]{5}ms$/, done);
    });

    it('should allow no digits', function (done) {
      const server = createServer({ digits: 0 } as ResponseTimeOptions);
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9]+ms$/, done);
    });
  });

  describe('with "header" option', function () {
    it('should default to X-Response-Time', function (done) {
      const server = createServer();
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+ms$/, done);
    });

    it('should allow custom header name', function (done) {
      const server = createServer({ header: 'X-Time-Taken' } as ResponseTimeOptions);
      request(server)
        .get('/')
        .expect('X-Time-Taken', /^[0-9.]+ms$/, done);
    });
  });

  describe('with "suffix" option', function () {
    it('should default to true', function (done) {
      const server = createServer();
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+ms$/, done);
    });

    it('should allow disabling suffix', function (done) {
      const server = createServer({ suffix: false } as ResponseTimeOptions);
      request(server)
        .get('/')
        .expect('X-Response-Time', /^[0-9.]+$/, done);
    });
  });
});

function createServer(opts?: ResponseTimeOptions | ResponseTimeOptionsFunction, fn?: unknown) {
  const _responseTime = responseTime(opts);
  return http.createServer((req: any, res: any) => {
    _responseTime(req, res, (err: any) => {
      setTimeout(function () {
        typeof fn === 'function' && fn(req, res);
        res.statusCode = err ? err.status || 500 : 200;
        res.end(err ? err.message : 'OK');
      }, 10);
    });
  });
}

function shouldNotHaveHeader(header: string) {
  return function (res: Response) {
    expect(!(header.toLowerCase() in res.header)).toBeTruthy();
  };
}
