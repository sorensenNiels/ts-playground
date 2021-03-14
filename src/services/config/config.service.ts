/* eslint-disable global-require */
/* eslint-disable import/no-dynamic-require */
import config from 'config';
import RootPath from 'app-root-path';

import { PackageJson } from 'type-fest';
import { getNodeEnv, isDevelopment, isTest, isProduction } from './node-env.util';

export class ConfigService {
  private readonly package: PackageJson;

  constructor() {
    this.package = require(`${RootPath}/package.json`);
  }

  // eslint-disable-next-line class-methods-use-this
  getAppRootPath(): RootPath {
    return RootPath;
  }

  getPackageName() {
    return this.package.name;
  }

  getPackageVersion() {
    return this.package.version;
  }

  getPackage() {
    return this.package;
  }

  // eslint-disable-next-line class-methods-use-this
  public has(key: string): boolean {
    return config.has(key);
  }

  // eslint-disable-next-line class-methods-use-this
  public get<T = string>(key: string, dft?: T): T {
    return config.has(key) ? config.get(key) : <T>dft;
  }

  public getNumber(key: string, dftVal?: number): number {
    return +this.get(key) || dftVal || 0;
  }

  get nodeEnv(): string {
    return getNodeEnv();
  }

  get isDevelopment(): boolean {
    return isDevelopment();
  }

  get isTest(): boolean {
    return isTest();
  }

  get isProduction(): boolean {
    return isProduction();
  }
}
