// This file is created by egg-ts-helper@1.25.6
// Do not modify this file!!!!!!!!!

import 'egg';
import ExportErrorHandler = require('../../../app/middleware/error_handler');
import ExportJwt = require('../../../app/middleware/jwt');

declare module 'egg' {
  interface IMiddleware {
    errorHandler: typeof ExportErrorHandler;
    jwt: typeof ExportJwt;
  }
}
