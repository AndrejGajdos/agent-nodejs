import { Collection } from '@forestadmin/agent';

import { Schema } from '../typings';

export default (collection: Collection<Schema, 'review'>) =>
  collection
    .addValidation('storeId', 'GreaterThan', 12)
    .addManyToOne('store', 'store', { foreignKey: 'storeId' });
