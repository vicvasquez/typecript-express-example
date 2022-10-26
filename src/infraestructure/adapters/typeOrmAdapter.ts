import { DataSource } from "typeorm";
import { Metrics } from "../../domain/ormEntities/metrics";
import { Organization } from "../../domain/ormEntities/organization";
import { Tribe } from "../../domain/ormEntities/tribe";
import { Repository } from "../../domain/ormEntities/repository";

export class TypeOrmAdapter {

    private static instance: TypeOrmAdapter;
    private static AppDataSource: any;

    constructor(){

    }

    public static getInstance(): TypeOrmAdapter {
        if (!TypeOrmAdapter.instance){
            TypeOrmAdapter.instance = new TypeOrmAdapter();
        }
        return TypeOrmAdapter.instance;
    }

    public getAppDataSource(){
        return TypeOrmAdapter.AppDataSource;
    }
    
    public async initConection(): Promise<void> {
        try {
            const dbUrl = new URL(process.env.DATABASE_URL || "");
            const routingId = dbUrl.searchParams.get("options");
            dbUrl.searchParams.delete("options");

            TypeOrmAdapter.AppDataSource = new DataSource({
                type: "cockroachdb",
                url: dbUrl.toString(),
                ssl: true,
                extra: {
                    options: routingId
                },
                entities:[
                    Organization,
                    Tribe,
                    Repository,
                    Metrics
                ]
            });

            TypeOrmAdapter.AppDataSource.initialize()
            .then(() => {
                console.log("Connected to Database");
            })
            .catch((error: any) => {
                console.log("Exception connecting to Databse: ", error);
            });;
        } catch (error) {
            console.log("Exception connecting to Databse: ", error);
        }
    }

}