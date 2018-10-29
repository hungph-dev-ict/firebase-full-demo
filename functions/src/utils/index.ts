import * as functions from 'firebase-functions';
import * as express from 'express';
import * as bodyParser from 'body-parser';

import { API_VERSION } from '../config';

// Lazy loaded module
// let iconv, parse, stringify, through2, Busboy, path;

export function createBaseExpressApp(
  apiPath,
  controller,
  disableAuthToken?,
  runtimeOpts = {}
) {
  const app = express();
  app.use(bodyParser.json());
  app.use(bodyParser.urlencoded({ extended: false }));

//   Authentication
//   if (!disableAuthToken) {
//     app.use(
//       expressJwt({
//         secret: API_SECRET,
//         getToken: function fromHeaderOrQuerystring(req) {
//           if (
//             req.headers.authorization &&
//             req.headers.authorization.split(' ')[0] === 'Bearer'
//           ) {
//             return req.headers.authorization.split(' ')[1];
//           } else if (req.query && req.query.token) {
//             return req.query.token;
//           }
//           console.error(
//             'Invalid or expired authorization token. API path: ',
//             apiPath
//           );
//           return null;
//         }
//       })
//     );
//     app.use(function (err, req, res, next) {
//       if (err.name === 'UnauthorizedError') {
//         res.status(401).send('Invalid or expired authorization token');
//       }
//     });
//   }

  // Routers
  app.use(`/${API_VERSION}/${apiPath}`, controller);

  // Catch 404 errors
  app.use(function (req, res, next) {
    const err: any = new Error('Not Found');
    err.status = 404;
    next(err);
  });

  // Catch 500 errors
  app.use(function (err, req, res, next) {
    res.status(err.status || 500);
    res.send({
      error: err.message
    });
  });

  return functions.runWith(runtimeOpts).https.onRequest(app);
}

export function makeError(message, code?, data?) {
  const error: any = new Error(message);
  error.code = code;
  error.data = data;
  return error;
}
