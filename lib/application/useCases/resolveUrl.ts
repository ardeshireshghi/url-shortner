import { Services } from '../../infrastructure/service-locator';

export async function resolveUrl(
  shortenedUrlKey: string,
  { urlCacheStore }: Services
) {
  return urlCacheStore.get(shortenedUrlKey);
}
