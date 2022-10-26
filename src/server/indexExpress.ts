import express, { Express, Request, Response } from 'express';
import dotenv from 'dotenv';
import { mockRoutes } from '../infraestructure/services/mockRoutes';
import { organizationRoutes } from '../infraestructure/services/organizationRoutes';
import { repositoryRoutes } from '../infraestructure/services/repositoryRoutes';

export class ServerExpress {

    public startServer() {
        dotenv.config();

        const port = process.env.SERVER_PORT;

        const app: Express = express();

        app.listen(port, () => {
            console.log("Started server on port " + port);
        });

        app.get("/health", (req: Request, res: Response) => {
            res.status(200).send("OK");
        });

        app.use(express.json());
        app.use(mockRoutes);
        app.use(organizationRoutes);
        app.use(repositoryRoutes);
    }
}