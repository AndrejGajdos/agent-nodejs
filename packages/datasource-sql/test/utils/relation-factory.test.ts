import { Model } from 'sequelize/types/model';
import { ModelStatic, Sequelize } from 'sequelize';

import { ForeignKeyReference } from '../../src/utils/types';
import RelationFactory from '../../src/utils/relation-factory';

describe('RelationFactory', () => {
  const setup = () => {
    const referenceModel = {
      hasOne: jest.fn(),
      hasMany: jest.fn(),
      belongsTo: jest.fn(),
      getAttributes: jest.fn().mockReturnValue([]),
    } as any as ModelStatic<Model>;
    const sequelize = { model: jest.fn().mockReturnValue(referenceModel) } as any as Sequelize;

    return { referenceModel, sequelize };
  };

  describe('build', () => {
    describe('when the relation is a junction table', () => {
      const setupAJunctionTable = () => {
        const { referenceModel, sequelize } = setup();

        referenceModel.getAttributes = jest.fn().mockReturnValue({
          id1: { _autoGenerated: false, primaryKey: true },
          id2: { _autoGenerated: false, primaryKey: true },
        });

        return { referenceModel, sequelize };
      };

      describe('when at least one referenced table is excluded', () => {
        it('should not add the relation when the first reference is excluded', () => {
          const { referenceModel, sequelize } = setupAJunctionTable();
          const foreignReferences: [Partial<ForeignKeyReference>, Partial<ForeignKeyReference>] = [
            {
              columnName: 'notImportant',
              referencedColumnName: 'notImportant',
              referencedTableName: 'tableA',
            },
            {
              columnName: 'notImportant',
              referencedColumnName: 'notImportant',
              referencedTableName: 'tableB',
            },
          ];
          const excludedTables = ['tableA'];

          RelationFactory.build('tableC', foreignReferences, [], sequelize, excludedTables);

          expect(referenceModel.belongsTo).not.toHaveBeenCalled();
        });

        it('should not add the relation when the second reference is excluded', () => {
          const { referenceModel, sequelize } = setupAJunctionTable();
          const foreignReferences: [Partial<ForeignKeyReference>, Partial<ForeignKeyReference>] = [
            {
              columnName: 'notImportant',
              referencedColumnName: 'notImportant',
              referencedTableName: 'tableA',
            },
            {
              columnName: 'notImportant',
              referencedColumnName: 'notImportant',
              referencedTableName: 'tableB',
            },
          ];
          const excludedTables = ['tableB'];

          RelationFactory.build('tableC', foreignReferences, [], sequelize, excludedTables);

          expect(referenceModel.belongsTo).not.toHaveBeenCalled();
        });
      });
    });

    describe('for the other relations', () => {
      describe('when the referenced table is excluded', () => {
        it('should not add the relation', () => {
          const { referenceModel, sequelize } = setup();
          const foreignReferences: Partial<ForeignKeyReference>[] = [
            {
              columnName: 'notImportant',
              referencedColumnName: 'notImportant',
              referencedTableName: 'tableA',
            },
          ];
          const excludedTables = ['tableA'];

          RelationFactory.build('tableC', foreignReferences, [], sequelize, excludedTables);

          expect(referenceModel.belongsTo).not.toHaveBeenCalled();
        });
      });

      describe('when the table is excluded', () => {
        it('should not add the relation', () => {
          const { referenceModel, sequelize } = setup();
          const foreignReferences: Partial<ForeignKeyReference>[] = [
            {
              columnName: 'notImportant',
              referencedColumnName: 'notImportant',
              referencedTableName: 'tableB',
            },
          ];
          const excludedTables = ['tableA'];

          RelationFactory.build('tableA', foreignReferences, [], sequelize, excludedTables);

          expect(referenceModel.belongsTo).not.toHaveBeenCalled();
        });
      });
    });
  });
});
