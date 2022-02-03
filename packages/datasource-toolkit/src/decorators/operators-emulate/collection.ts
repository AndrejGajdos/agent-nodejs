import ConditionTree from '../../interfaces/query/condition-tree/base';
import ConditionTreeLeaf, { Operator } from '../../interfaces/query/condition-tree/leaf';
import PaginatedFilter from '../../interfaces/query/filter/paginated';
import {
  CollectionSchema,
  ColumnSchema,
  FieldSchema,
  RelationSchema,
} from '../../interfaces/schema';
import ConditionTreeUtils from '../../utils/condition-tree';
import SchemaUtils from '../../utils/schema';
import ConditionTreeValidator from '../../validation/condition-tree';
import FieldValidator from '../../validation/field';
import CollectionDecorator from '../collection-decorator';
import DataSourceDecorator from '../datasource-decorator';
import { OperatorReplacer } from './types';

export default class OperatorsEmulate extends CollectionDecorator {
  override readonly dataSource: DataSourceDecorator<OperatorsEmulate>;
  private readonly fields: Map<string, Map<Operator, OperatorReplacer>> = new Map();

  emulateOperator(name: string, operator: Operator): void {
    this.implementOperator(name, operator, null);
  }

  implementOperator(name: string, operator: Operator, replaceBy: OperatorReplacer): void {
    // Check that the collection can actually support our rewriting
    const pks = SchemaUtils.getPrimaryKeys(this.childCollection.schema);
    pks.forEach(pk => {
      const schema = this.childCollection.schema.fields[pk] as ColumnSchema;
      const operators = schema.filterOperators;

      if (!operators?.has(Operator.Equal) || !operators?.has(Operator.Equal)) {
        throw new Error(
          `Cannot override operators on collection '${this.name}': ` +
            `the primary key columns must support 'equal' and 'in' operators`,
        );
      }
    });

    // Check that targeted field is valid
    const field = this.childCollection.schema.fields[name] as ColumnSchema;
    FieldValidator.validate(this, name);
    if (!field) throw new Error('Cannot replace operator for relation');

    // Mark the field operator as replaced.
    if (!this.fields.has(name)) this.fields.set(name, new Map());
    this.fields.get(name).set(operator, replaceBy);
  }

  protected refineSchema(childSchema: CollectionSchema): CollectionSchema {
    const fields: Record<string, FieldSchema> = {};

    for (const [name, schema] of Object.entries(childSchema.fields)) {
      if (this.fields.has(name)) {
        const column = schema as ColumnSchema;
        fields[name] = {
          ...column,
          filterOperators: new Set([
            ...(column.filterOperators ?? []),
            ...this.fields.get(name).keys(),
          ]),
        };
      } else {
        fields[name] = schema;
      }
    }

    return { ...childSchema, fields };
  }

  protected override async refineFilter(filter?: PaginatedFilter): Promise<PaginatedFilter> {
    return filter?.override({
      conditionTree: await filter.conditionTree?.replaceLeafsAsync(leaf =>
        this.replaceLeaf(leaf, []),
      ),
    });
  }

  private async replaceLeaf(
    leaf: ConditionTreeLeaf,
    replacements: string[],
  ): Promise<ConditionTree> {
    // ConditionTree is targeting a field on another collection => recurse.
    if (leaf.field.includes(':')) {
      const [prefix] = leaf.field.split(':');
      const schema = this.schema.fields[prefix] as RelationSchema;
      const association = this.dataSource.getCollection(schema.foreignCollection);
      const associationLeaf = await leaf
        .unnest()
        .replaceLeafsAsync(subLeaf => association.replaceLeaf(subLeaf, replacements));

      return associationLeaf.nest(prefix);
    }

    return this.fields.get(leaf.field)?.has(leaf.operator)
      ? this.computeEquivalent(leaf, replacements)
      : leaf;
  }

  private async computeEquivalent(
    leaf: ConditionTreeLeaf,
    replacements: string[],
  ): Promise<ConditionTree> {
    const handler = this.fields.get(leaf.field)?.get(leaf.operator);

    if (handler) {
      const replacementId = `${this.name}.${leaf.field}[${leaf.operator}]`;
      const subReplacements = [...replacements, replacementId];

      if (replacements.includes(replacementId)) {
        throw new Error(`Operator replacement cycle: ${subReplacements.join(' -> ')}`);
      }

      let equivalentTree = await handler(leaf.value, this.dataSource);

      if (equivalentTree) {
        equivalentTree = await equivalentTree.replaceLeafsAsync(subLeaf =>
          this.replaceLeaf(subLeaf, subReplacements),
        );

        ConditionTreeValidator.validate(equivalentTree, this);

        return equivalentTree;
      }
    }

    // Query all records on the dataSource and emulate the filter.
    return ConditionTreeUtils.matchRecords(
      this.schema,
      leaf.apply(await this.list(null, leaf.projection.withPks(this))),
    );
  }
}