import { IncomingMessage } from 'http';

type Chunk = Buffer | Uint8Array;

export const parseReqBody = (req: IncomingMessage): Promise<any> => {
  const data: Chunk[] = [];

  return new Promise((resolve, reject) => {
    if (
      !req.headers['content-type'] ||
      req.headers['content-type'].toLowerCase() !== 'application/json'
    ) {
      resolve({});
      return;
    }

    req.on('data', (chunk: Chunk) => {
      data.push(chunk);
    });

    req.on('end', () => {
      const body = Buffer.concat(data);
      resolve(JSON.parse(body.length === 0 ? '{}' : body.toString()));
    });

    req.on('error', (err) => {
      reject(err);
    });
  });
};
