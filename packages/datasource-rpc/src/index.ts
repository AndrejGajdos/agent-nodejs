/* eslint-disable @typescript-eslint/no-use-before-define */
/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable max-classes-per-file */
/* eslint-disable import/prefer-default-export */

import {
  ActionField,
  ActionResult,
  AggregateResult,
  Aggregation,
  BaseDataSource,
  Caller,
  Collection,
  CollectionSchema,
  DataSource,
  DataSourceFactory,
  Filter,
  PaginatedFilter,
  Projection,
  RecordData,
  TSchema,
} from '@forestadmin/datasource-toolkit';
import axios from 'axios';

export type RpcOptions = {
  preSharedKey: string;
};

type QueryFn = (data: any) => Promise<any>;

const defaultUrl = 'http://localhost:1234';

export function connectRemoteDataSource(options: any, url: string = defaultUrl): DataSourceFactory {
  const query: QueryFn = async data => {
    const response = await axios.post(url, { dataSource: options, ...data });

    return response.data;
  };

  return async (): Promise<DataSource> => {
    const handshake = JSON.parse(
      JSON.stringify(await query({ method: 'handshake' })),
      (key, value) => {
        return key === 'filterOperators' ? new Set(value) : value;
      },
    );

    return new RpcDataSource(query, handshake);
  };
}

class RpcDataSource extends BaseDataSource {
  constructor(query: QueryFn, handshake: any) {
    super();

    Object.assign(this.schema, handshake.dataSourceSchema);

    for (const [name, schema] of Object.entries(handshake.collectionSchemas)) {
      this.addCollection(new RpcCollection(name, this, query, schema as CollectionSchema));
    }
  }
}

class RpcCollection implements Collection {
  readonly schema: CollectionSchema;
  readonly name: string;
  readonly dataSource: RpcDataSource;
  readonly queryFn: QueryFn;

  constructor(name: string, dataSource: RpcDataSource, queryFn: QueryFn, schema: CollectionSchema) {
    this.schema = schema;
    this.name = name;
    this.dataSource = dataSource;
    this.queryFn = data => queryFn({ collection: this.name, ...data });
  }

  async execute(
    caller: Caller,
    name: string,
    formValues: RecordData,
    filter?: Filter,
  ): Promise<ActionResult> {
    return this.queryFn({ method: 'execute', params: { caller, name, formValues, filter } });
  }

  async getForm(
    caller: Caller,
    name: string,
    formValues?: RecordData,
    filter?: Filter,
  ): Promise<ActionField[]> {
    return this.queryFn({ method: 'getForm', params: { caller, name, formValues, filter } });
  }

  async create(caller: Caller, data: RecordData[]): Promise<RecordData[]> {
    return this.queryFn({ method: 'create', params: { caller, data } });
  }

  async list(
    caller: Caller,
    filter: PaginatedFilter,
    projection: Projection,
  ): Promise<RecordData[]> {
    return this.queryFn({ method: 'list', params: { caller, filter, projection } });
  }

  async update(caller: Caller, filter: Filter, patch: RecordData): Promise<void> {
    await this.queryFn({ method: 'update', params: { caller, filter, patch } });
  }

  async delete(caller: Caller, filter: Filter): Promise<void> {
    await this.queryFn({ method: 'delete', params: { caller, filter } });
  }

  async aggregate(
    caller: Caller,
    filter: Filter,
    aggregation: Aggregation,
    limit?: number,
  ): Promise<AggregateResult<TSchema, string>[]> {
    return this.queryFn({ method: 'aggregate', params: { caller, filter, aggregation, limit } });
  }
}
