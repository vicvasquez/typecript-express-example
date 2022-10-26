import express, { Request, Response } from 'express';
import { IRepository } from '../../domain/interfaces/repository_interface';
import { RepositoryController } from '../controllers/repositoryController';

export const repositoryRoutes = express.Router();

const prefix_route = "/repository";

repositoryRoutes.get(prefix_route + "/metrics-by-tribe/:tribe_id", async (req: Request, res: Response): Promise<any> => {
    try {
        const repositoryController = RepositoryController.getInstance();
        const tribe_id = req.params.tribe_id;
        const result = await repositoryController.getMetricsByTribe(parseInt(tribe_id));

        if (result.error != null) {
            res.status(500).json(result.error);
        }

        res.status(result.status).json({
            repositories: result.data
        });
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

repositoryRoutes.get(prefix_route + "/generate-report/:tribe_id", async (req: Request, res: Response): Promise<any> => {
    try {
        const repositoryController = RepositoryController.getInstance();
        const tribe_id = req.params.tribe_id;
        const result = await repositoryController.generateReportByTribe(parseInt(tribe_id));

        if (result.error != null) {
            res.status(500).json(result.error);
        }

        res.setHeader("Content-type", "text/csv");
        res.setHeader("Content-Disposition", "attachment; filename=metricsReport.csv");

        res.status(result.status).end(result.data);

    } catch (error) {
        res.status(500).json({ error: error });
    }
});