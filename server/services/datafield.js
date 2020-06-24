import { DataField } from '@/models';
import * as db from '@/models';
import SequelizeHelperService from '@/services/sequelize-helper';


class DataFieldService {
  async addToModel(resourceInstance, datafields = [], junctionTable, foreignKey) {
    const instanceId = resourceInstance.id;

    if (datafields.length) {
      await SequelizeHelperService.syncM2M({
        instance: resourceInstance,
        newValues: datafields,
        targetModel: junctionTable,
        foreignKey,
        otherKey: 'datafield_id',
      });
    }

    return {
      includeLoadInstruction: {
        model: DataField,
        attributes: ['id', 'name', 'description', 'type'],
        through: { attributes: [] },
      },
    };
  }
}

export default new DataFieldService();
