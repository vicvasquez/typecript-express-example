import { IOrganization } from "../../domain/interfaces/organization_interface";
import { Organization } from "../../domain/ormEntities/organization";
import { TypeOrmAdapter } from "../adapters";

export class OrganizationController {
    private static instance: OrganizationController;

    public static getInstance(): OrganizationController {
        if (!OrganizationController.instance) {
            OrganizationController.instance = new OrganizationController();
        }
        return OrganizationController.instance;
    }

    public async insertOrganization(organization: IOrganization): Promise<any> {
        try {
            const adapter = TypeOrmAdapter.getInstance().getAppDataSource();
            const organizationRepository = adapter.getRepository(Organization);

            const res = await organizationRepository.save(organization);

            return { status: 201, data: res.id_organization }

        } catch (error) {
            return { error: error}
        }
    }

    public async updateOrganization(organization: IOrganization): Promise<any> {
        try {
            const adapter = TypeOrmAdapter.getInstance().getAppDataSource();
            const organizationRepository = adapter.getRepository(Organization);

            const id = organization.id_organization;
            delete organization.id_organization;
            const res = await organizationRepository.update({id_organization: id }, organization);

            return { status: 200, data: res }

        } catch (error) {
            return { error: error}
        }
    }

    public async getAllOrganization(): Promise<any> {
        try {
            const adapter = TypeOrmAdapter.getInstance().getAppDataSource();
            const organizationRepository = adapter.getRepository(Organization);

            const res = await organizationRepository.find();

            return { status: 200, data: res }

        } catch (error) {
            return { error: error}
        }
    }

    public async deleteOrganization(id: number): Promise<any> {
        try {
            const adapter = TypeOrmAdapter.getInstance().getAppDataSource();
            const organizationRepository = adapter.getRepository(Organization);

            const res = await organizationRepository.delete({id_organization: id});

            return { status: 200, data: res }

        } catch (error) {
            return { error: error}
        }
    }
}