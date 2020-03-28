import finale from 'finale-rest';
import UserController from './controllers/user';
import ProviderController from './controllers/provider';
import DataFieldsController from './controllers/datafields';
import * as db from './models';

export default function routes(app) {
  finale.initialize({
    app,
    sequelize: db.sequelizeInstance,
  });

  const APP_PATH = '/api/v1';

  new UserController({ prefix: `${APP_PATH}/users`, app, finale });
  new ProviderController({ prefix: `${APP_PATH}/providers`, app, finale });
  new DataFieldsController({ prefix: `${APP_PATH}/datafields`, app, finale });
}
