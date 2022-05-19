import { BaseDataSource, DataSource, Logger } from '@forestadmin/datasource-toolkit';
import { CachedDataSourceOptions } from '../types';
import CachedCollection from './cached-collection';

export default class CachedDataSource extends BaseDataSource {
  private cache: DataSource;
  private options: CachedDataSourceOptions;
  private lastCursor: string;

  constructor(logger: Logger, cache: DataSource, options: CachedDataSourceOptions) {
    super();

    this.cache = cache;
    this.options = options;

    for (const collection of cache.collections)
      this.addCollection(new CachedCollection(collection, this, options));
  }

  async sync(): Promise<void> {
    const { cursor, changes, deletions } = await this.options.listChanges(this.lastCursor);
    this.lastCursor = cursor;
  }
}
