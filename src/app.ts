import express, { type Express } from 'express';
import ROUTER from './modules/index.routes.js';
import { errorHandler } from './common/error-handler.js';

const app: Express = express();

app.use(express.json());

app.use('/api', ROUTER);

app.use(errorHandler);

export default app;