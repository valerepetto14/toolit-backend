import express, { Application } from 'express';
import dotenv from 'dotenv';

class App {
    public app: Application;
    public port: number;

    constructor(appInit: { port: number; middleWares: any; routes: any; services: any }) {
        this.app = express();
        this.port = appInit.port;

        this.middlewares(appInit.middleWares);
        this.routes(appInit.routes);
        this.initServices(appInit.services);
    }

    private middlewares(middleWares: { forEach: (arg0: (middleWare: any) => void) => void }) {
        middleWares.forEach((middleWare) => {
            this.app.use(middleWare);
        });
    }

    private routes(routers: { forEach: (arg0: (route: any) => void) => void }) {
        routers.forEach((route) => {
            this.app.use(route[0], route[1]);
        });
    }

    public initServices(services: { forEach: (arg0: (service: any) => void) => void }) {
        services.forEach((service) => {
            service.init();
        });
    }

    public listen() {
        dotenv.config();
        this.app.listen(this.port, () => {
            console.log(`App listening on the http://localhost:${this.port}`);
        });
    }
}

export default App;
