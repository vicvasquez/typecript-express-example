import express, { Request, Response } from 'express';
import { IOrganization } from '../../domain/interfaces/organization_interface';
import { OrganizationController } from '../controllers/organizationController';

export const organizationRoutes = express.Router();

const prefix_route = "/organization";

organizationRoutes.post(prefix_route + "/", async (req: Request, res: Response): Promise<any> => {
    try {
        const organizationController = OrganizationController.getInstance();
        const result = await organizationController.insertOrganization(req.body as IOrganization);

        if (result.error != null) {
            res.status(500).json(result.error);
        }

        res.status(result.status).json({
            data: result.data
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

organizationRoutes.patch(prefix_route + "/", async (req: Request, res: Response): Promise<any> => {
    try {
        const organizationController = OrganizationController.getInstance();
        const result = await organizationController.updateOrganization(req.body as IOrganization);

        if (result.error != null) {
            res.status(500).json(result.error);
        }

        res.status(result.status).json({
            data: result.data
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

organizationRoutes.get(prefix_route + "/", async (req: Request, res: Response): Promise<any> => {
    try {
        const organizationController = OrganizationController.getInstance();
        const result = await organizationController.getAllOrganization();

        if (result.error != null) {
            res.status(500).json(result.error);
        }

        res.status(result.status).json({
            data: result.data
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

organizationRoutes.delete(prefix_route + "/:id", async (req: Request, res: Response): Promise<any> => {
    try {
        const id = req.params.id;
        const organizationController = OrganizationController.getInstance();
        const result = await organizationController.deleteOrganization(parseInt(id));

        if (result.error != null) {
            res.status(500).json(result.error);
        }

        res.status(result.status).json({
            data: result.data
        })
    } catch (error) {
        res.status(500).json({ error: error });
    }
})

