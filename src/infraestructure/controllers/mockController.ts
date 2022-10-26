export class MockController {
    private static instance: MockController;

    public static getInstance(): MockController {
        if (!MockController.instance) {
            MockController.instance = new MockController();
        }
        return MockController.instance;
    }

    public async getMockData(): Promise<any> {
        try {
            const data = {
                "repositories": [
                    {
                        "id": 1,
                        "state": 604
                    },
                    {
                        "id": 2,
                        "state": 605
                    },
                    {
                        "id": 3,
                        "state": 606
                    }
                ]
            }
            return { status: 200, data: data }

        } catch (error) {
            return { error: error }
        }
    }
}