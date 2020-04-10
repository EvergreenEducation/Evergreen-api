import { DataField } from '@/models';

class DataFieldService {
  async addToModel(resourceInstance, datafields = []) {
    const instanceId = resourceInstance.id;

    if (datafields.length) {
      await resourceInstance.addDataFields(datafields);
    }

    return {
      includeLoadInstruction: {
        model: DataField,
        attributes: ['id', 'name', 'description'],
        through: { attributes: [] },
      },
    };
  }
}

export default new DataFieldService();
