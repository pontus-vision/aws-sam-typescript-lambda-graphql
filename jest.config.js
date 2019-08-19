module.exports = {
  "transform": {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  "roots": [
    "./src",
    "./dist"
  ],
  moduleFileExtensions: ['js'],
};