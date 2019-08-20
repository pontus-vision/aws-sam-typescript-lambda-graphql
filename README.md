# Setup Local Development Environment for Lambda/Node/GraphQL

## Aim
After completing this Guide/Documentation you will:

+ have a local development environment where you can develop run and deploy your lambda code
+ understand the code structure
+ Succesfully run queries and mutations against the Trains and Cars POC Application via GraphQL.

## Step 1: Install Node, npm and required node modules
+ Node and NPM (NPM is installed when you install Node.js)
 ```
  brew update && brew install node
  node -v
  npm -v
  ```

## Step 2: Setup SAM Configuration Locally
+ Install AWS SAM CLI
 ```
  brew tap aws/tap
  brew install aws-sam-cli

  ```
+ Verify the AWS SAM CLI is installed in the floowing location
+ `/usr/local/bin/sam`
+ Verify the Installation
+ `sam --version`
+ Output should be
+ `SAM CLI, version xxxx`

## Step 3: Setup Local PostgresQL Database
+ Clone Github Project https://github.com/pontus-vision/aws-sam-typescript-lambda-graphql
+ Navigate to postgresdb directory e.g. aws-sam-typescript-lambda-graphql/postgresdb
+ Deploy a dockerised postgres (useful commands below.)
 ```
  docker-compose up
  
  docker-compose down
  
  docker volume prune -f
  
  docker image prune -f
  
  docker-compose rm --all
  
  docker-compose build --no-cache

  ```
+ Create a secrets/POSTGRES_PASSWORD_FILE in aws-sam-typescript-lambda-graphql/postgresdb:
```
<your pg password>
```
+ Docker exec and enter the password you stored in POSTGRES_PASSWORD_FILE; this will mount the file under /run/secrets/POSTGRES_PASSWORD_FILE in the container

## Step 4: Run Trains and Cars Application to Verify your setup
+ Navigate to parent directory of cloned project
+ Install required npm modules
+ `npm install`
+ Navigate to parent directory and run command
+ `npm run local-sam`
+ Open your browser and Navigate to http://127.0.0.1:4000/graphq
+ Other commands you can run are in aws-sam-typescript-lambda-graphql/package.json
 ```
  "build-schema": "rimraf ./dist/graphql/schema/ && find src/graphql/types -iname \"*.ts\" > ts-files.txt && tsc ./src/graphql/schema/genereator-schema.ts --outDir ./dist/graphql/schema/ --lib esnext && tsc @ts-files.txt --outDir ./dist/graphql/types --lib esnext && rimraf ts-files.txt",
  "build-schema:win": "rimraf ./dist/graphql/schema/ && dir /s /b \"src/graphql/types\" | findstr /e .ts > ts-files.txt && tsc ./src/graphql/schema/genereator-schema.ts --outDir ./dist/graphql/schema/ --lib esnext && tsc @ts-files.txt --outDir ./dist/graphql/types --lib esnext && del ts-files.txt",
  "generate-ts": "gql-gen",
  "pregenerate": "npm run build-schema",
  "pregenerate:win": "npm run build-schema:win",
  "generate": "npm run generate-ts",
  "generate:win": "npm run generate-ts",
  "clean": "rimraf dist",
  "prebuild": "npm run clean && npm run generate",
  "build": "npm run tsc",
  "build:win": "npm run tsc:win",
  "start": "sls offline start --skipCacheInvalidation",
  "dev": "tsc --watch & nodemon dist",
  "test": "tsc && mocha dist/**/*.spec.js",
  "lint": "eslint src --ext ts",
  "tsc": "tsc",
  "tsc:win": "tsc",
  "sls:offline": "npm run build && npm start",
  "sls:offline:win": "npm run build && npm start",
  "tslint": "tslint --fix -c tslint.json 'src/**/*.ts'",
  "prettier": "prettier --write \"src/**/*.ts\"",
  "precommit-tslint": "tslint --fix -c tslint.json",
  "precommit-prettier": "prettier --write",
  "tslint-check": "tslint-config-prettier-check ./tslint.json",
  "local-sam-debug": "sam local start-api --port 4000 --docker-network postgresdb_graphql --debug -d 5010",
  "local-sam": "sam local start-api --port 4000 --docker-network postgresdb_graphql",
  "deploy": "npm run build && sls deploy"
  ```

## Step 5: Setup IDE for Local Debugging (Intellij)
+ From project parent directory, run the app in debug mode e.g.
+ `npm run local-sam-debug`
+ Open Intellij and Configure NodeJS Debugger against port above 5010
+ Select your breakpoints, Submit a Query in the Playground on the Webui and trigger debug

## Step 6: Testing with Jest
+ Jest is already added as a dev dependency in package.json, so running npm install as part of Step 4 will have installed it.
+ Look at https://jestjs.io/docs/en/getting-started for more information setting up jest.
+ To execute test, run `npm run test` from the command line.
+ We have added tests for GraphQL queries and Mutations, these can be triggered by executng the command above.
+ As part of out test, we Mock interactions with the database via the MockSQLService class.
+ We then verify responses and spy on database calls to ensure correct calls are made and with the correct parameters.


## Code Structure
Technologies
+ AWS SAM - https://docs.aws.amazon.com/serverless-application-model/latest/developerguide/what-is-sam.html
+ GraphQL - https://graphql.org/learn/ and https://www.npmjs.com/package/graphql-cli
+ TypeScript - https://www.typescriptlang.org/
+ PostgresQL Database with JsonB: https://www.postgresql.org/docs/9.4/datatype-json.html
+ Nodejs - https://nodejs.org/en/docs/guides/
```
├── LICENSE -- License file
├── README.md -- This file
├── codegen.yml  -- this file has the configuration to create the auto-generated types.d.ts file. 
├── jest.config.js -- configuration file that defines the behaviour of the Jest Unit Tests.
├── lambda.js  -- entry point for the AWS Lambda
├── package-lock.json 
├── package.json -- this has all the NPM dependencies and utility scripts for this project.
├── postgresdb -- All the files in this directory enable users to create a dockerised PostgreSQL DB
│   ├── docker
│   │   ├── Dockerfile -- Docker file that pulls the PostGreSQL 
│   │   └── init.sql  -- initial table creation DDL (this is automatically called from the docker image code
│   ├── docker-compose.yml
│   └── secrets -- database password; this is not checked into this project, as it contains sensitive information; see step 3 above
│       └── POSTGRES_PASSWORD_FILE
├── sam-template.yml -- AWS SAM template file.
├── serverless.yml -- symbolic link to sam-template.yml
├── src
│   ├── aws-wrapper.ts -- instantiates the apollo server object used by the lambda entry point
│   ├── context.ts -- class that is passed to the resolvers; this is initialized with injectable services (currently SQLService)
│   ├── core
│   │   ├── config
│   │   │   ├── AbstractSetting.ts -- exposes the configuration interfaces 
│   │   │   ├── IConfig.ts -- interfaces for configuration parameters used in other classes.
│   │   │   └── Setting.ts -- creates the concrete class implementation  of the AbstractSetting. Uses IConfig as a class attribute.
│   │   ├── constants
│   │   │   └── Queries.ts -- class that has a list of all the query strings.
│   │   ├── injector.ts -- class that has the list of all the Injectable classes.  You MUST define all injectable classes here.
│   │   └── logger -- logging implementation.
│   │       ├── AbstractLogger.ts 
│   │       └── Logger.ts
│   ├── graphql
│   │   ├── resolvers  -- This directory has the code that maps the GraphQL request 
│   │   │   ├── car.ts  -- this class maps the GraphQL queries and mutations into SQL statements for cars.
│   │   │   └── train.ts -- this class maps the GraphQL queries and mutations into SQL statements for trains.
│   │   ├── schema
│   │   │   ├── genereator-schema.ts -- used by (npm run build-schema); merges and exports all the types defined in the types folder
│   │   │   └── schema.ts -- merges and exports the schemas and resolvers.
│   │   └── types -- this folder has a list of all the graphql schemas.  These are concatenated to form the whole GraphQL 
│   │       ├── car.ts
│   │       └── train.ts
│   ├── interfaces
│   │   ├── IAppContext.ts -- defines the interface for the Context otbject
│   │   └── types.d.ts -- auto-generated file that has the transpiled GQL schema; DO NOT change this, as it's built with npm.
│   ├── server.ts -- This file defines the signature of the ApolloServer instance in typescript
│   └── services
│       └── sql
│           └── SQLService.ts -- service that provides access to the DB (NOTE: must add these in the core/injector.ts)
├── template.yml -> sam-template.yml
├── test -- Unit tests for the services and resolvers.
│   ├── car.test.ts
│   └── services
│       └── sql
│           └── MockSQLService.ts
├── tsconfig.json -- config file for typescript
└── tslint.json -- on git commit, this enforces that the code conforms to pure typescript syntax. 
```

