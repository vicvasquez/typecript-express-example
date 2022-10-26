import { Metrics } from "../ormEntities/metrics"
import { Tribe } from "../ormEntities/tribe"

export interface IRepository {
    id_repository?: number,
    id_tribe: number,
    state: string,
    create_time: Date,
    status: string,

    tribe: Tribe,
    metrics: Metrics
}