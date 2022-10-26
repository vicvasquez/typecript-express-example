import { RepositoryController } from "../../../src/infraestructure/controllers/repositoryController";
import { Repository } from "../../../src/domain/ormEntities/repository";
import { Tribe } from "../../../src/domain/ormEntities/tribe";
import { Organization } from "../../../src/domain/ormEntities/organization";
import { Metrics } from "../../../src/domain/ormEntities/metrics";
import { Messages } from "../../../src/enums/responseMessages";

let repositoryArray: Repository[] = [];
const repository = new Repository();

repository.id_repository = 1;
repository.id_tribe = 1;
repository.name = "cd-common-utils Mock";
repository.state = "E";
repository.create_time = new Date();
repository.status = "A";
repository.tribe = new Tribe();
repository.tribe.id_tribe = 1;
repository.tribe.id_organization = 1;
repository.tribe.name = "Centro Digital Mock";
repository.tribe.status = 1;
repository.tribe.organization = new Organization();
repository.tribe.organization.id_organization = 1;
repository.tribe.organization.name = "Banco Pichincha Mock";
repository.tribe.organization.status = 1
repository.metrics = new Metrics();
repository.metrics.id_repository = 1
repository.metrics.coverage = 100
repository.metrics.code_smells = 0
repository.metrics.bugs = 0
repository.metrics.vulnerabilities = 0
repository.metrics.hotspot = 0

repositoryArray.push(repository);

let tribe = new Tribe();
tribe.id_tribe = 1;
tribe.id_organization = 1;
tribe.name = "Centro Digital Mock";
tribe.status = 1;

const mockRepository: Promise<Repository[]> = new Promise((resolve) => {
    resolve(repositoryArray);
});

const mockRepositoryEmpty: Promise<Repository[]> = new Promise((resolve) => {
    resolve([]);
});

const mockTribe: Promise<Tribe> = new Promise((resolve) => {
    resolve(tribe);
});

const mockTribeEmpty: Promise<any> = new Promise((resolve) => {
    resolve(null);
});

const mockExternalApi: Promise<any> = new Promise((resolve) => {
    resolve([
        {
            "id": 1,
            "state": 604,
            "verificationState": "Verificado",
        },
        {
            "id": 2,
            "state": 605,
            "verificationState": "En espera",
        },
        {
            "id": 3,
            "state": 606,
            "verificationState": "Aprobado",
        }
    ])
});

const mockRepositoryResult = [
    {
        "id": 1,
        "name": "cd-common-utils Mock",
        "tribe": "Centro Digital Mock",
        "organization": "Banco Pichincha Mock",
        "coverage": "100%",
        "codeSmells": 0,
        "bugs": 0,
        "vulnerabilities": 0,
        "hotspots": 0,
        "verificationState": "Verificado",
        "state": "Habilitado",
    }
]

describe("Validations for repositories", () => {
    beforeEach(() => {
        jest.restoreAllMocks();
    });
    describe("Escenario 1", () => {
        it("should return found value", async () => {
            const repositoryController = RepositoryController.getInstance();

            jest.spyOn(repositoryController, 'getTribeData').mockReturnValue(mockTribe);
            jest.spyOn(repositoryController, 'getRepositoryData').mockReturnValue(mockRepository);
            jest.spyOn(repositoryController, 'callExternalApi').mockReturnValue(mockExternalApi);

            const res = await repositoryController.getMetricsByTribe(1);

            expect(res.data).toStrictEqual(mockRepositoryResult);
        })
    })
    describe("Escenario 2", () => {
        it("should return a message that the tribe it's not registered", async () => {
            const repositoryController = RepositoryController.getInstance();

            jest.spyOn(repositoryController, 'getTribeData').mockReturnValue(mockTribeEmpty);

            const res = await repositoryController.getMetricsByTribe(2);

            expect(res.data).toStrictEqual(Messages.NO_REGISTERED_TRIBE);
        })
    }),
    describe("Escenario 3", () => {
        it("should return verification state of the mockedRepository", async () => {
            const repositoryController = RepositoryController.getInstance();

            jest.spyOn(repositoryController, 'getTribeData').mockReturnValue(mockTribe);
            jest.spyOn(repositoryController, 'getRepositoryData').mockReturnValue(mockRepository);
            jest.spyOn(repositoryController, 'callExternalApi').mockReturnValue(mockExternalApi);

            const res = await repositoryController.getMetricsByTribe(1);

            expect(res.data[0].verificationState).toStrictEqual("Verificado");
        })
    }),
    describe("Escenario 4", () => {
        it("should return a message that the tribe doesn't have repostories with the mocked coverage", async () => {
            const repositoryController = RepositoryController.getInstance();

            jest.spyOn(repositoryController, 'getTribeData').mockReturnValue(mockTribe);
            jest.spyOn(repositoryController, 'getRepositoryData').mockReturnValue(mockRepositoryEmpty);
            jest.spyOn(repositoryController, 'callExternalApi').mockReturnValue(mockExternalApi);

            const res = await repositoryController.getMetricsByTribe(1);

            expect(res.data).toStrictEqual(Messages.NO_COVERAGE);
        })
    })
});