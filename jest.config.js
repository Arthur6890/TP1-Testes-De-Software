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