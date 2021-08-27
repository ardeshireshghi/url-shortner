import http from 'http';

import { registerController } from '../controllers/register';
import { resolveController } from '../controllers/resolve';

export const handler: http.RequestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  // Register URL route
  if (req.url?.includes('/register') && req.method === 'POST') {
    registerController(req, res);
    return;
  } else {
    if (req.url?.slice(1) && req.method === 'GET') {
      resolveController(req, res);
      return;
    }
  }

  res.statusCode = 404;
  res.end();
};
