module.exports = {
  "transform": {
    "^.+\\.[jt]sx?$": "ts-jest"
  },
  preset: 'ts-jest',
  testEnvironment: 'node',
  verbose: true,
  "roots": [
    "./src",
    "./dist",
    "./node_modules"
  ],
  "moduleDirectories": [
    "node_modules",
    "src"
  ],
  moduleFileExtensions: ['js'],
};