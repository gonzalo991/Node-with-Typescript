import app from './app.js';
import { config } from 'dotenv';
config();

const PORT = process.env.PORT || 8080;

const HOST =
  process.env.NODE_ENV === 'production'
    ? process.env.NODE_ENV_PROD
    : process.env.NODE_ENV_DEV;

app.listen(PORT, () => console.log(`🔥Server running on ${HOST}`));