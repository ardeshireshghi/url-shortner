import { Storage } from '../domain/Storage';
import { UrlStoreItem } from '../domain/UrlStoreItem';
import getConfig from './config';
import { createStore, StorageType } from './store';

const { urlCacheStoreType } = getConfig();

export interface Services {
  urlCacheStore: Storage<UrlStoreItem>;
}

export function buildServices(): Services {
  return {
    urlCacheStore: createStore<UrlStoreItem>(
      urlCacheStoreType as StorageType,
      'shortenedUrlCache'
    )
  };
}

export default buildServices();
