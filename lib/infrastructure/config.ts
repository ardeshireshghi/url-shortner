import { StorageType } from './store';

function getConfig() {
  const config = {
    serverPort: process.env.SERVICE_PORT || 3322,
    shortenedUrlProtocol: process.env.SHORTENED_PROTOCOL || 'http',
    urlCacheStoreType: process.env.URL_CACHE_STORE_TYPE || StorageType.Memory
  };

  return config;
}

export default getConfig;
