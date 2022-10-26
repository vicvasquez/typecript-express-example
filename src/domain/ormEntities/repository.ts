import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToOne,
    JoinColumn
} from "typeorm"
import { Tribe } from "./tribe"
import { Metrics } from "./metrics"

@Entity({ name: "repository", synchronize: false, schema: "public"})
export class Repository {
    @PrimaryGeneratedColumn()
    id_repository: number
    @Column("int", {nullable: false})
    id_tribe: number
    @Column("text", {nullable: false})
    name: string
    @Column("text", {nullable: false})
    state: string
    @Column("date", {nullable: false})
    create_time: Date
    @Column("text", {nullable: false})
    status: string

    @ManyToOne(() => Tribe, (tribe) => tribe.repotisotires)
    @JoinColumn({ name: "id_tribe" })
    tribe: Tribe

    @OneToOne(() => Metrics, (metrics) => metrics.repository)
    metrics: Metrics
}