import { IRepository } from "./repository_interface";

export interface IMetrics {
    id_repository?: number,
    coverage: number,
    bugs: number,
    vulnerabilities: number,
    hotspot: number,
    code_smells: number,

    repository: IRepository
}