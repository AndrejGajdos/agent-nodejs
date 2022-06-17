/* eslint-disable @typescript-eslint/no-explicit-any */
import { DataSource, DataSourceFactory } from '@forestadmin/datasource-toolkit';
import axios from 'axios';

import { QueryFn } from './types';
import RpcDataSource from './datasource';

const defaultUrl = 'http://localhost:1234';

export { default as RemoteCollection } from './collection';
export { default as RemoteDatasource } from './datasource';

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
