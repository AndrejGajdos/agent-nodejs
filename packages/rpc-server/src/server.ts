/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Aggregation,
  ConditionTreeFactory,
  DataSource,
  Page,
  PaginatedFilter,
  Projection,
  Sort,
} from '@forestadmin/datasource-toolkit';
import { createSqlDataSource } from '@forestadmin/datasource-sql';
import Koa, { Context } from 'koa';
import bodyParser from 'koa-bodyparser';
import hashObject from 'object-hash';

export default class RpcServer {
  private instances: Record<string, DataSource> = {};
  private app: Koa;

  constructor() {
    this.app = new Koa();
    this.app.use(bodyParser({ jsonLimit: '50mb' }));
    this.app.use(this.handleRun.bind(this));
  }

  start() {
    this.app.listen(1234);
  }

  private async handleRun(ctx: Context): Promise<void> {
    const { body } = ctx.request;
    let result: unknown;

    const dataSource = await this.getDataSource(body.dataSource);

    if (body.collection) {
      const collection = dataSource.getCollection(body.collection);

      if (body.method === 'list') {
        result = await collection.list(
          body.params.caller,
          this.filterFromJson(body.params.filter),
          new Projection(...(body.params.projection ?? [])),
        );
      } else if (body.method === 'create') {
        result = await collection.create(body.params.caller, body.params.data);
      } else if (body.method === 'update') {
        result = await collection.update(
          body.params.caller,
          this.filterFromJson(body.params.filter),
          body.params.patch,
        );
      } else if (body.method === 'delete') {
        result = await collection.delete(
          body.params.caller,
          this.filterFromJson(body.params.filter),
        );
      } else if (body.method === 'aggregate') {
        result = await collection.aggregate(
          body.params.caller,
          this.filterFromJson(body.params.filter),
          new Aggregation(body.params.aggregation),
          body.params.limit,
        );
      } else {
        throw new Error('Unsupported');
      }
    } else if (body.method === 'renderChart') {
      result = await dataSource.renderChart(body.params.caller, body.params.name);
    } else if (body.method === 'schema') {
      result = dataSource.schema;
    } else if (body.method === 'handshake') {
      const dataSourceSchema = dataSource.schema;
      const collectionSchemas = dataSource.collections.reduce(
        (memo, collection) => ({ ...memo, [collection.name]: collection.schema }),
        {},
      );

      result = {
        dataSourceSchema,
        collectionSchemas: JSON.parse(
          JSON.stringify(collectionSchemas, (key, value) => {
            return key === 'filterOperators' ? [...value.values()] : value;
          }),
        ),
      };
    } else {
      throw new Error('Unsupported');
    }

    ctx.response.body = result;
  }

  private filterFromJson(json: any): PaginatedFilter {
    const conditionTree = ConditionTreeFactory.fromPlainObject(json?.conditionTree ?? null);
    const page = new Page(json?.page?.skip, json?.page?.limit);
    const sort = new Sort(...(json?.sort ?? []));
    const { search, searchExtended, segment } = json;

    return new PaginatedFilter({
      conditionTree,
      page,
      sort,
      search,
      searchExtended,
      segment,
    });
  }

  private async getDataSource(definition: any): Promise<DataSource> {
    const id = hashObject(definition);

    if (!this.instances[id]) {
      if (definition.type === 'sql') {
        const factory = createSqlDataSource(definition.uri);
        this.instances[id] = await factory(() => {});
      } else {
        throw new Error('Unsupported');
      }
    }

    return this.instances[id];
  }
}
