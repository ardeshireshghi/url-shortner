import http from 'http';
import { registerNewUrl } from '../../application/useCases/registerNewUrl';
import getConfig from '../../infrastructure/config';
import { parseReqBody } from '../../infrastructure/jsonBodyParser';
import { default as services } from '../../infrastructure/service-locator';

export const registerController: http.RequestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  // Register URL route
  const reqBody = await parseReqBody(req);

  // Validate input
  if (!reqBody.address || !reqBody.ttlSeconds) {
    res.statusCode = 422;
    res.end(
      JSON.stringify({
        error: {
          message: '`address` and/or `ttlSeconds` missing',
          code: 422
        }
      })
    );

    return;
  }

  const result = await registerNewUrl(
    {
      headers: req.headers,
      protocol: getConfig().shortenedUrlProtocol
    },
    {
      address: reqBody.address,
      ttlSeconds: reqBody.ttlSeconds
    },
    services
  );

  if (!result) {
    res.statusCode = 409;
    res.end(
      JSON.stringify({
        error: {
          message: 'Shortened url already exists',
          code: 409
        }
      })
    );
  } else {
    res.end(
      JSON.stringify({
        success: true,
        data: result
      })
    );
  }
};
