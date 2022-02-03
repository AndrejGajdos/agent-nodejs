import { FindOptions, Op, Order, OrOperator, WhereOperators, WhereOptions } from 'sequelize';
import {
  Aggregator,
  ConditionTree,
  ConditionTreeBranch,
  ConditionTreeLeaf,
  ConditionTreeNot,
  Filter,
  Operator,
  PaginatedFilter,
} from '@forestadmin/datasource-toolkit';

function makeWhereClause(operator: Operator, value?): WhereOperators | OrOperator {
  if (operator === null) throw new Error('Invalid (null) operator.');

  switch (operator) {
    case Operator.Blank:
      return { [Op.or]: [makeWhereClause(Operator.Missing), { [Op.eq]: '' }] };
    case Operator.Contains:
      return { [Op.iLike]: `%${value}%` };
    case Operator.EndsWith:
      return { [Op.iLike]: `%${value}` };
    case Operator.Equal:
      return { [Op.eq]: value };
    case Operator.GreaterThan:
      return { [Op.gt]: value };
    case Operator.In:
      return { [Op.in]: value };
    case Operator.IncludesAll:
      return { [Op.contains]: value };
    case Operator.LessThan:
      return { [Op.lt]: value };
    case Operator.Missing:
      return { [Op.is]: null };
    case Operator.NotContains:
      return { [Op.notILike]: `%${value}%` };
    case Operator.NotEqual:
      return { [Op.ne]: value };
    case Operator.NotIn:
      return { [Op.notIn]: value };
    case Operator.Present:
      return { [Op.not]: { [Op.is]: null } };
    case Operator.StartsWith:
      return { [Op.iLike]: `${value}%` };
    default:
      throw new Error(`Unsupported operator: "${operator}".`);
  }
}

function convertConditionTreeToSequelize(conditionTree: ConditionTree): WhereOptions {
  const sequelizeWhereClause = {};

  if ((conditionTree as ConditionTreeBranch).aggregator !== undefined) {
    const { aggregator, conditions } = conditionTree as ConditionTreeBranch;

    if (aggregator === null) {
      throw new Error('Invalid (null) aggregator.');
    }

    const sequelizeOperator = aggregator === Aggregator.And ? Op.and : Op.or;

    if (!Array.isArray(conditions) || conditions.length < 2) {
      throw new Error('Two or more conditions needed for aggregation.');
    }

    sequelizeWhereClause[sequelizeOperator] = conditions.map(condition =>
      convertConditionTreeToSequelize(condition),
    );
  } else if ((conditionTree as ConditionTreeNot).condition !== undefined) {
    const { condition } = conditionTree as ConditionTreeNot;

    if (condition === null) {
      throw new Error('Invalid (null) condition.');
    }

    sequelizeWhereClause[Op.not] = convertConditionTreeToSequelize(
      (conditionTree as ConditionTreeNot).condition,
    );
  } else if ((conditionTree as ConditionTreeLeaf).operator !== undefined) {
    const { field, operator, value } = conditionTree as ConditionTreeLeaf;

    sequelizeWhereClause[field] = makeWhereClause(operator, value);
  } else {
    throw new Error('Invalid ConditionTree.');
  }

  return sequelizeWhereClause;
}

export function convertFilterToSequelize(filter: Filter): FindOptions {
  if (!filter) {
    throw new Error('Invalid (null) filter.');
  }

  const sequelizeFilter: FindOptions = {};

  if (filter.conditionTree) {
    sequelizeFilter.where = convertConditionTreeToSequelize(filter.conditionTree);
  }

  // TODO: Handle `search`
  // TODO: Handle `searchExtended`
  // TODO: Handle `segment`
  // TODO: Handle `timezone`

  return sequelizeFilter;
}

export function convertPaginatedFilterToSequelize(filter: PaginatedFilter): FindOptions {
  const sequelizeFilter = convertFilterToSequelize(filter);

  const pageLimit = filter.page?.limit ?? null;
  const pageOffset = filter.page?.skip ?? null;

  if (pageLimit !== null) sequelizeFilter.limit = pageLimit;
  if (pageOffset !== null) sequelizeFilter.offset = pageOffset;

  const order: Order = filter.sort?.map(value => [
    value.field,
    value.ascending === false ? 'DESC' : 'ASC',
  ]);

  if (Array.isArray(order) && order.length > 0) sequelizeFilter.order = order;

  return sequelizeFilter;
}