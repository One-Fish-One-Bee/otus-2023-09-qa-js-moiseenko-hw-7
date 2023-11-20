module.exports = {
  testEnvironment: 'node',
  moduleFileExtensions: ['js', 'json'],
  transform: {
    '^.+\\.jsx?$': 'babel-jest',
  },
  testMatch: ['**/specs/**/1 postAuth.spec.js', '**/specs/**/2 delUser.spec.js', '**/specs/**/3 getUser.spec.js', '**/specs/**/CRUD.spec.js'],
  testRunner: 'jest-jasmine2',
  setupFilesAfterEnv: ['jest-allure/dist/setup'],
  globals: {
    testTimeout: 50000,
  },
  verbose: true,
};
