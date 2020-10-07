import finale from 'finale-rest';
import UserController from './controllers/user';
import ProviderController from './controllers/provider';
import DataFieldsController from './controllers/datafield';
import OfferController from './controllers/offer';
import PathwayController from './controllers/pathway';
import FileController from './controllers/file';
import EnrollmetnController from './controllers/enrollment';
import StudentController from './controllers/student';
var cors = require('cors');
import * as db from './models';

export default function routes(app) {
  app.use(cors({ origin: "*" }));
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
  new FileController({ prefix: `${APP_PATH}/files`, app, finale });

  new EnrollmetnController({ prefix: `${APP_PATH}/enrollments`, app, finale });
  new StudentController({ prefix: `${APP_PATH}/students`, app, finale });
}
