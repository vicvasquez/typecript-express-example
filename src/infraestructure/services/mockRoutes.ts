import express, { Request, Response } from 'express';
import { MockController } from '../controllers/mockController';

export const mockRoutes = express.Router();

const prefix_route = "/mock";

mockRoutes.get(prefix_route + "/", async (req: Request, res: Response): Promise<any> => {
    try {
        const mockController = MockController.getInstance();
        const result = await mockController.getMockData();

        res.status(result.status).json(result.data);
    } catch (error) {
        res.status(500).json({ error: error });
    }
})