module.exports = {
  preset: "jest-preset-angular",
  setupFilesAfterEnv: ["<rootDir>/setup-jest.ts"],
  globalSetup: "jest-preset-angular/global-setup",
  modulePaths: ["<rootDir>"],
  testPathIgnorePatterns: [
    "<rootDir>/node_modules/",
    "<rootDir>/dist/",
    "<rootDir>/cypress/",
    "<rootDir>/src/test.ts",
    "<rootDir>/blog/",
    "<rootDir>/scully/",
    "<rootDir>/.angular/",
    "<rootDir>/scully-routes.json",
    "<rootDir>/libs/",
    "<rootDir>/scully.brunoelo.config.js",
    "<rootDir>/scully.brunoelo.config.ts",
  ],
};
