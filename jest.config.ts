import type { Config } from 'jest';

export default async (): Promise<Config> => {
    return {
        testEnvironment: "node",
        clearMocks: true,
        roots: ["./src/infraestructure/controllers", "./test/unit"],
        testMatch: ["<rootDir>/**/*.test.ts"],
        verbose: true,
        moduleDirectories: ["node_modules", "src"],
        testTimeout: 20000,
    };
};