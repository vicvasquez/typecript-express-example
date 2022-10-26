import { Repository } from "../../domain/ormEntities/repository";
import { Tribe } from "../../domain/ormEntities/tribe";
import { TypeOrmAdapter } from "../adapters";
import { Messages } from "../../enums/responseMessages";
import { REPOSITORY_STATES, VERIFICATION_STATE } from "../../enums/codeDetails";
import axios from "axios";

const CsvParser = require("json2csv").Parser;

export class RepositoryController {
    private static instance: RepositoryController;

    public static getInstance(): RepositoryController {
        if (!RepositoryController.instance) {
            RepositoryController.instance = new RepositoryController();
        }
        return RepositoryController.instance;
    }

    public async getMetricsByTribe(id_tribe: number): Promise<any> {
        try {
            const tribe: Tribe = await this.getTribeData(id_tribe);

            if (tribe == null) {
                return { status: 404, data: Messages.NO_REGISTERED_TRIBE }
            }

            const repositories: Repository[] = await this.getRepositoryData(id_tribe);

            if (repositories.length == 0) {
                return { status: 404, data: Messages.NO_COVERAGE }
            }

            const mockData: any[] = await this.callExternalApi();

            let repositoriesFormated = [];

            try {
                repositoriesFormated = repositories.map((repository) => {
                    const objMockFound = mockData.find((aux) => {
                        return aux.id == repository.id_repository
                    })
                    return {
                        id: repository.id_repository,
                        name: repository.name,
                        tribe: repository.tribe.name,
                        organization: repository.tribe.organization.name,
                        coverage: repository.metrics.coverage + "%",
                        codeSmells: repository.metrics.code_smells,
                        bugs: repository.metrics.bugs,
                        vulnerabilities: repository.metrics.vulnerabilities,
                        hotspots: repository.metrics.hotspot,
                        verificationState: objMockFound.verificationState,
                        state: REPOSITORY_STATES.get(repository.state)
                    }
                });
            } catch (error) {
                return { error: error }
            }

            return { status: 200, data: repositoriesFormated }

        } catch (error) {
            return { error: error }
        }
    }

    public async getTribeData(id_tribe: number): Promise<Tribe> {
        const adapter = TypeOrmAdapter.getInstance().getAppDataSource();
        const tribeRepository = adapter.getRepository(Tribe);

        return await tribeRepository.findOne({ where: { id_tribe: id_tribe } });
    }

    public async getRepositoryData(id_tribe: number): Promise<Repository[]> {

        try {
            const adapter = TypeOrmAdapter.getInstance().getAppDataSource();
            const repositoryRepository = adapter.getRepository(Repository);

            const currentYear = new Date().getFullYear();
            const startDate = new Date(currentYear + '-01-01');
            const endDate = new Date(currentYear + '-12-31');

            return await repositoryRepository
                .createQueryBuilder('repository')
                .leftJoinAndSelect('repository.tribe', 'tribe')
                .leftJoinAndSelect('repository.metrics', 'metrics')
                .leftJoinAndSelect('tribe.organization', 'organization')
                .where('repository.id_tribe = :id_tribe', { id_tribe: id_tribe })
                .andWhere('repository.create_time between :startDate and :endDate', { startDate: startDate, endDate: endDate })
                .andWhere('repository.state = :state', { state: 'E' })
                .andWhere('metrics.coverage > :coverage', {coverage: 75})
                .getMany();

        } catch (error) {
            console.log(error);
            return [];
        }
    }

    public async callExternalApi() {
        try {
            const res = await axios.get("http://localhost:8080/mock/");

            if (res.status != 200)
                return [];

            const result = res.data.repositories.map((repository: any) => {
                return {
                    ...repository,
                    verificationState: VERIFICATION_STATE.get(repository.state),
                }
            });

            return result;
        } catch (error) {
            return error;
        }
    }

    public async generateReportByTribe(id_tribe: number) {
        try {
            const repositories: any = await this.getMetricsByTribe(id_tribe);

            if (repositories.status != 200) {
                return repositories;
            }

            const headers = ["id", "name", "tribe", "organization", "coverage", "codeSmells", "bugs", "vulnerabilities", "hotspots", "verificationState", "state"]

            const csvParser = new CsvParser(headers)
            const csvData = csvParser.parse(repositories.data);

            return { status: 200, data: csvData }

        } catch (error) {
            return error;
        }
    }
}