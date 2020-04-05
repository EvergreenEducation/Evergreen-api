import finale from 'finale-rest';
import UserController from './controllers/user';
import ProviderController from './controllers/provider';
import DataFieldsController from './controllers/datafields';
import OfferController from './controllers/offer';
import PathwayController from './controllers/pathway';
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
  new OfferController({ prefix: `${APP_PATH}/offers`, app, finale });
  new PathwayController({ prefix: `${APP_PATH}/pathways`, app, finale });
}
