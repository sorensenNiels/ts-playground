export enum Environment {
  development = 'development',
  test = 'test',
  production = 'production'
}

export const isDevelopment = () => {
  return getNodeEnv() === Environment.development;
};

export const isTest = () => {
  return getNodeEnv() === Environment.test;
};

export const isProduction = () => {
  return getNodeEnv() === Environment.production;
};

export const getNodeEnv = (): Environment => {
  return (process.env.NODE_ENV as Environment) || Environment.development;
};
