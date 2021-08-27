import { createHash } from 'crypto';

export function createHashForUrlAddress(
  address: string,
  algorithm: string = 'sha256'
) {
  return createHash(algorithm)
    .update(address, 'utf8')
    .digest('hex')
    .slice(0, 12);
}
