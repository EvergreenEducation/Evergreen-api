import { DataFields } from '@/models';

class DataFieldService {
  async addToModel(resourceInstance, datafields = []) {
    const instanceId = resourceInstance.id;
    const datafieldInstances = await DataFields.findAll({
      where: {
        id: datafields,
      },
    });

    if (datafieldInstances.length) {
      await resourceInstance.addDataFields(datafieldInstances);
    }

    // the model where the instance is created from
    const model = resourceInstance.constructor;
    const instance = await model.findByPk(instanceId, {
      include: [{ model: DataFields }],
    });

    return instance;
  }
}

export default new DataFieldService();
