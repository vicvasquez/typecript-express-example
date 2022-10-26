import { ServerExpress } from './server/indexExpress';
import { TypeOrmAdapter } from './infraestructure/adapters';

const app = new ServerExpress();

app.startServer();

TypeOrmAdapter.getInstance().initConection();


