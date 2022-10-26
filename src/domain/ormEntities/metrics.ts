import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToOne,
    JoinColumn
} from "typeorm"
import { Repository } from "./repository"

@Entity({ name: "metrics", synchronize: false, schema: "public"})
export class Metrics {
    @PrimaryGeneratedColumn()
    id_repository: number
    @Column("decimal", {nullable: false})
    coverage: number
    @Column("int", {nullable: false})
    bugs: number
    @Column("int", {nullable: false})
    vulnerabilities: number
    @Column("int", {nullable: false})
    hotspot: number
    @Column("int", {nullable: false})
    code_smells: number

    @OneToOne(() => Repository, (repository) => repository.metrics)
    @JoinColumn({ name: "id_repository" })
    repository: Repository
}