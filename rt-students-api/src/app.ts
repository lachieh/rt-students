import basicAuth from 'express-basic-auth';
import bluebird from 'bluebird';
import dotenv from 'dotenv';
import express from 'express';
import mongoose from 'mongoose';
import cors, { CorsOptions } from 'cors';
import path from 'path';

import ControllerInterface from './interfaces/ControllerInterface';
import HttpException from './exceptions/HttpException';
import { RequestHandler } from 'express-serve-static-core';

class App {
    public app: express.Application;

    constructor(controllers: ControllerInterface[]) {
        dotenv.config();
        this.app = express();
        this.connectDatabase();
        this.initMiddleware();
        this.initControllers(controllers);
        this.initErrorHandling();
    }

    public listen(): void {
        this.app.set('port', process.env['PORT'] || 3000);
        this.app.listen(this.app.get('port'), () => {
            console.log(
                'App is running at http://localhost:%d in %s mode',
                this.app.get('port'),
                this.app.get('env')
            );
        });
    }

    public getApp(): express.Application {
        return this.app;
    }

    private handleErrors(
        err: any,
        req: express.Request,
        res: express.Response,
        next: express.NextFunction
    ): void {
        if (req.xhr || req.headers.accept.indexOf('json') >= 0) {
            if (err instanceof mongoose.Error.ValidatorError) {
                res.status(400).send({
                    error: { ...err },
                });
            } else if (err instanceof HttpException) {
                res.status(err.status).send({ error: err.message });
            } else {
                res.status(500).send({ error: err });
            }
        } else {
            next(err);
        }
    }

    private handleCors(): RequestHandler {
        const corsOptions: CorsOptions = {
            origin: process.env['FRONT_HOST'],
        };
        return cors(corsOptions);
    }

    private connectDatabase(): void {
        mongoose.Promise = bluebird;
        mongoose.connect(process.env['MONGODB_URI'], {
            useNewUrlParser: true,
            useCreateIndex: true,
            useUnifiedTopology: true,
        });
    }

    private initMiddleware(): void {
        this.app.use(this.handleCors());
        this.app.use(
            basicAuth({
                users: { admin: 'supersecret' },
            })
        );
        this.app.use(express.json());
        this.app.use(express.urlencoded({ extended: true }));
        this.app.use(
            express.static(path.join(__dirname, 'public'), {
                maxAge: 31557600000,
            })
        );
    }

    private initControllers(controllers: ControllerInterface[]): void {
        controllers.forEach(controller => {
            this.app.use('/', controller.router);
        });
    }

    private initErrorHandling(): void {
        this.app.use(this.handleErrors);
    }
}

export default App;
