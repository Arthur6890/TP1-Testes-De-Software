module.exports = {
  globals: {
    "ts-jest": {
      tsconfig: "tsconfig.jest.json",
    },
  },
  transform: {
    "^.+\\.(ts|tsx)$": "ts-jest",
  },
  testMatch: ["**/tests/**/*.test.(ts|js|tsx)"],
  testEnvironment: "node",
  collectCoverageFrom: ["*/.{ts,tsx}"],
  coveragePathIgnorePatterns: [
    "./node_modules/",
    "./docs/",
    "./tests/",
    "./dist/",
    "./infra/",
    "./development",
  ],
  coverageReporters: ["lcov", "text", "html"],
};