import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    ManyToOne,
    OneToMany,
    JoinColumn
} from "typeorm"
import { Organization } from "./organization"
import { Repository } from "./repository"

@Entity({ name: "tribe", synchronize: false, schema: "public"})
export class Tribe {
    @PrimaryGeneratedColumn()
    id_tribe: number
    @Column("int", {nullable: false})
    id_organization: number
    @Column("text", {nullable: false})
    name: string
    @Column("int", {nullable: false})
    status: number

    @ManyToOne(() => Organization, (organization) => organization.tribes)
    @JoinColumn({ name: "id_organization" })
    organization: Organization

    @OneToMany(() => Repository, (repository) => repository.tribe)
    repotisotires: Repository[]
}