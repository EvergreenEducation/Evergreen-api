
class SequelizeHelperService {
  async load(instance, loadInstructions) {
    const model = instance.constructor;
    instance = await model.findByPk(instance.id, {
      include: loadInstructions,
    });

    return instance;
  }
}

export default new SequelizeHelperService();
