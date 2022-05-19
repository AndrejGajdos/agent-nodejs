/* eslint-disable max-classes-per-file */
import { DataSourceFactory } from '@forestadmin/datasource-toolkit';
import { createCachedDataSource } from '@forestadmin/datasource-live';

export default function createTypicodeCached(): DataSourceFactory {
  return createCachedDataSource(
    {
      post: {
        id: { isPrimaryKey: true, type: 'Column', columnType: 'Number' },
        userId: { type: 'Column', columnType: 'Number' },
        title: { type: 'Column', columnType: 'String' },
        body: { type: 'Column', columnType: 'String' },
      },
      comment: {
        id: { isPrimaryKey: true, type: 'Column', columnType: 'Number' },
        postId: { type: 'Column', columnType: 'Number' },
        name: { type: 'Column', columnType: 'String' },
        email: { type: 'Column', columnType: 'String' },
        body: { type: 'Column', columnType: 'String' },
        post: {
          type: 'ManyToOne',
          foreignCollection: 'post',
          foreignKey: 'postId',
          foreignKeyTarget: 'id',
        },
      },
    },
    {
      listChanges: async cursor => {
        return {
          changes: [],
          cursor: null,
          deletions: [],
        };
      },
    },
  );
}
