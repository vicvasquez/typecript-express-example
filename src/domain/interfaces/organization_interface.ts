import { Tribe } from "../ormEntities/tribe";

export interface IOrganization {
    id_organization?: number,
    name: string,
    status: number,

    tribes: Tribe[]
}