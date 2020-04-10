import lodash from 'lodash';
import Promise from 'bluebird';
import { pluralize, capitalize } from 'inflection';
import { sequelizeInstance, Sequelize } from '@/models';

const { QueryTypes } = Sequelize;

class SequelizeHelperService {
  async load(instance, loadInstructions) {
    const model = instance.constructor;
    instance = await model.findByPk(instance.id, {
      include: loadInstructions,
    });

    return instance;
  }

  async syncM2M({
    instance,
    newValues,
    targetModel,
    foreignKey,
    otherKey,
    extra = {},
  }) {
    if (typeof targetModel === 'string') {
      let query = `SELECT ${otherKey} from ${targetModel} where ${foreignKey}=${instance.id}`;
      const result = await sequelizeInstance.query(query);

      // this is array of id that currently exist in the join table
      const currentRelationship = result[0].map(row => row[otherKey]);
      const toBeRemove = lodash.difference(currentRelationship, newValues);
      const toBeAdd = lodash.difference(newValues, currentRelationship);

      for (const removeItem of toBeRemove) {
        query = `Delete from ${targetModel} where ${foreignKey}=${instance.id} AND ${otherKey}=${removeItem}`;
        await sequelizeInstance.query(query);
      }
      for (const addItem of toBeAdd) {
        query = `Insert into ${targetModel} (${foreignKey}, ${otherKey}) values (${instance.id}, ${addItem})`;
        await sequelizeInstance.query(query);
      }
    } else {
      const result = await targetModel.findAll({
        where: {
          [foreignKey]: instance.id,
          ...extra,
        },
      });

      // this is array of id that currently exist in the join table
      const currentRelationship = result.map(row => row[otherKey]);
      const toBeRemove = lodash.difference(currentRelationship, newValues);
      const toBeAdd = lodash.difference(newValues, currentRelationship);

      for (const removeItem of toBeRemove) {
        await targetModel.destroy({
          force: true,
          where: {
            [foreignKey]: instance.id,
            [otherKey]: removeItem,
            ...extra,
          },
        });
      }
      for (const addItem of toBeAdd) {
        await targetModel.create({
          [foreignKey]: instance.id,
          [otherKey]: addItem,
          ...extra,
        });
      }
    }
  }
}

export default new SequelizeHelperService();
