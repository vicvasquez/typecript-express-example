import { IOrganization } from "./organization_interface"
import { IRepository } from "./repository_interface"

export interface ITribe {
    id_tribe?: number,
    name: string,
    status: number,
    
    organization: IOrganization,
    repositories: IRepository[]
}