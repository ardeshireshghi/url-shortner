import http from 'http';
import { ShortendUrl } from '../../domain/ShortenedUrl';
import { UrlStoreItem } from '../../domain/UrlStoreItem';

import { createHashForUrlAddress } from '../../infrastructure/createHashForUrlAddress';

export async function registerNewUrl(
  reqParams: {
    headers: http.IncomingMessage['headers'];
    protocol: string;
  },
  urlData: {
    address: string;
    ttlSeconds: number;
  },
  { urlCacheStore }
): Promise<ShortendUrl | undefined> {
  const { address, ttlSeconds } = urlData;
  const addressHash = createHashForUrlAddress(address);

  if (urlCacheStore.exists(addressHash)) {
    return;
  }

  const cacheItem: UrlStoreItem = {
    address,
    ttlSeconds
  };

  urlCacheStore.set(addressHash, cacheItem);

  return {
    target: address,
    shortened: `${reqParams.protocol}://${reqParams.headers.host}/${addressHash}`
  };
}
