import App from './app';
import dotenv from 'dotenv';
dotenv.config();
import Express from 'express';
import cors from 'cors';
import morgan from 'morgan';

import { Auth } from './routes';
import handleErrors from './middlewares/handleErrors';

const app = new App({
    port: Number(process.env.PORT) || 3000,
    middleWares: [Express.json(), Express.urlencoded({ extended: true }), cors(), morgan('dev')],
    routes: [
        ['/auth', Auth],
        ['/*', handleErrors],
    ],
    services: [],
});

app.listen();
