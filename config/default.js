module.exports = {
  httpPort: 3000,
  transportPort: 4000,

  pinoHttp: {
    level: process.env.NODE_ENV !== 'production' ? 'debug' : 'info',
    prettyPrint: process.env.NODE_ENV !== 'production'
  }
};
