import { ModelAttributes, ModelDefined } from 'sequelize/types';

export default class SequelizeModelAttributes {
  /**
   * Sequelize 6.12 introduced a new getAttributes() function, which is
   * a getter on rawAttributes. As we want to support >=6.2 versions, this
   * code is mandatory to check the existence of getAttributes.
   */
  static getAttributes(model: ModelDefined<unknown, unknown>): ModelAttributes {
    return model.getAttributes ? model.getAttributes() : model.rawAttributes;
  }
}
