import{
    Entity,
    Column,
    PrimaryGeneratedColumn,
    OneToMany
} from "typeorm"
import { Tribe } from "./tribe"

@Entity({ name: "organization", synchronize: false, schema: "public"})
export class Organization {
    @PrimaryGeneratedColumn()
    id_organization: number
    @Column("text", {nullable: false})
    name: string
    @Column("int", {nullable: false})
    status: number

    @OneToMany(() => Tribe, (tribe) => tribe.organization)
    tribes: Tribe[]
}