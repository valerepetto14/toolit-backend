import App from './app';
import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import cors from 'cors';

import { Auth } from './routes';
import handleErrors from './middlewares/handleErrors';

const app = new App({
    port: 3001,
    middleWares: [Express.json(), Express.urlencoded({ extended: true }), cors()],
    routes: [
        ['/auth', Auth],
        ['/*', handleErrors],
    ],
    services: [],
});

app.listen();