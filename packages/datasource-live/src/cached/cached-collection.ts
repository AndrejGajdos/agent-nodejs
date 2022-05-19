import {
  AggregateResult,
  Aggregation,
  BaseCollection,
  Caller,
  Collection,
  ConditionTreeFactory,
  Filter,
  PaginatedFilter,
  Projection,
  ProjectionFactory,
  RecordData,
  RecordUtils,
} from '@forestadmin/datasource-toolkit';
import { CachedDataSourceOptions } from '../types';
import CachedDataSource from './cached-datasource';

export default class CachedCollection extends BaseCollection {
  override dataSource: CachedDataSource;
  private cache: Collection;
  private options: CachedDataSourceOptions;

  constructor(
    collection: Collection,
    dataSource: CachedDataSource,
    options: CachedDataSourceOptions,
  ) {
    super(collection.name, dataSource);

    this.cache = collection;
    this.options = options;
  }

  async create(caller: Caller, records: RecordData[]): Promise<RecordData[]> {
    const promises = records.map(record => this.options.createRecord(this.name, record));
    await Promise.all(promises);

    const projection = ProjectionFactory.columns(this);
    const filter = new PaginatedFilter({
      conditionTree: ConditionTreeFactory.matchRecords(this.schema, records),
    });

    return this.list(caller, filter, projection);
  }

  async list(
    caller: Caller,
    filter: PaginatedFilter,
    projection: Projection,
  ): Promise<RecordData[]> {
    await this.dataSource.sync();

    return this.cache.list(caller, filter, projection);
  }

  async update(caller: Caller, filter: Filter, patch: RecordData): Promise<void> {
    const records = await this.list(caller, filter, new Projection().withPks(this));
    const promises = records
      .map(record => RecordUtils.getPrimaryKey(this.schema, record))
      .map(id => this.options.updateRecord(this.name, id, patch));

    await Promise.all(promises);
  }

  async delete(caller: Caller, filter: Filter): Promise<void> {
    const records = await this.list(caller, filter, new Projection().withPks(this));
    const promises = records
      .map(record => RecordUtils.getPrimaryKey(this.schema, record))
      .map(id => this.options.deleteRecord(this.name, id));

    await Promise.all(promises);
  }

  async aggregate(
    caller: Caller,
    filter: Filter,
    aggregation: Aggregation,
    limit?: number,
  ): Promise<AggregateResult[]> {
    this.dataSource.sync();

    return this.cache.aggregate(caller, filter, aggregation, limit);
  }
}
