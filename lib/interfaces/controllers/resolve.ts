import http from 'http';

import { resolveUrl } from '../../application/useCases/resolveUrl';
import { default as services } from '../../infrastructure/service-locator';

export const resolveController: http.RequestListener = async (
  req: http.IncomingMessage,
  res: http.ServerResponse
) => {
  // Query shortened url route
  const shortenedUrlKey = req.url?.slice(1);
  if (shortenedUrlKey) {
    const mappedUrl = await resolveUrl(shortenedUrlKey, services);

    if (!mappedUrl) {
      res.statusCode = 404;
      res.end();
    } else {
      res.statusCode = 302;
      res.setHeader('Location', mappedUrl.address);
      res.end();
    }
  } else {
    res.statusCode = 404;
    res.end();
  }

  return;
};
