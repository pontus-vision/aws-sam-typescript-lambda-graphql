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
├── bzt -- Blazemeter Taurus end to end tests
│   ├── README.md -- This file
│   ├── docker_run.sh  -- this file has the configuration to build docker and run the taurus test. 
│   ├── 00_mutation.yml -- this file contains taurus post request script.
│   ├── 01_query.yml -- this file  contains taurus get request script
│   ├── addcar.json  -- file contains payload request for mutation.
│   ├── test1.json  -- file contains payload request for query.
│   ├── 90-artifacts-dir.json -- file contains setting for artifacts-dir directory.
│   ├── 99-zinstallID.json -- contains the docker installing id
│   └── 90-no-console.json -- file contains enabling the console log settings.
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
├── serverless.yml -- Alternative template for the Serverless framework
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

# Testing
## Unit Testing with Jest
+ Jest is already added as a dev dependency in package.json, Look at https://jestjs.io/docs/en/getting-started for more information setting up jest.
+ To execute test, run "npm run test" from the command line.
+ GraphQL Queries and Mutations and mutation tests have been amended to validate encryption of items being stored to the database and decryption of items leaving the database before they are presented to the user.
+ Unit Test have been added for the Cryptography Service for generating cipher angorithm, encryption and decryption using the nodejs primary crypto module.

## Integration Testing with Blazemeter Taurus
Blazemeter Taurus is a test harness that enables functional and non-functional tests to be run; the samples included here only send one mutation, and wait for one response back.  When running this locally, blazemeter will run in a docker container, with a network set to 'host', so it can contact the SAM framework lambda.

To run the tests, run the following:
```
cd bzt 
./docker_run.sh
```
Here is a sample result:
```
Successfully tagged carsbzt:latest
09:58:13 INFO: Taurus CLI Tool v1.13.8
09:58:13 INFO: Starting with configs: ['/bzt-config/00_mutation.yml']
09:58:13 INFO: Configuring...
09:58:14 INFO: Artifacts dir: /bzt/bzt_artifacts
09:58:14 INFO: Preparing...
09:58:23 INFO: Starting...
09:58:23 INFO: Waiting for results...
09:58:51 WARNING: Please wait for graceful shutdown...
09:58:51 INFO: Shutting down...
09:58:51 INFO: Post-processing...
09:58:51 INFO: Test duration: 0:00:28
09:58:51 INFO: Samples count: 1, 0.00% failures
09:58:51 INFO: Average times: total 21.402, latency 21.402, connect 0.063
09:58:51 INFO: Percentiles:
┌───────────────┬───────────────┐
│ Percentile, % │ Resp. Time, s │
├───────────────┼───────────────┤
│           0.0 │        21.392 │
│          50.0 │        21.392 │
│          90.0 │        21.392 │
│          95.0 │        21.392 │
│          99.0 │        21.392 │
│          99.9 │        21.392 │
│         100.0 │        21.392 │
└───────────────┴───────────────┘
09:58:51 INFO: Request label stats:
┌────────┬────────┬─────────┬────────┬───────┐
│ label  │ status │    succ │ avg_rt │ error │
├────────┼────────┼─────────┼────────┼───────┤
│ addCar │   OK   │ 100.00% │ 21.402 │       │
└────────┴────────┴─────────┴────────┴───────┘
09:58:51 INFO: Test duration: 0:00:28
09:58:51 INFO: Samples count: 1, 0.00% failures
09:58:51 INFO: Average times: total 21.402, latency 21.402, connect 0.063
09:58:51 INFO: Percentiles:
┌───────────────┬───────────────┐
│ Percentile, % │ Resp. Time, s │
├───────────────┼───────────────┤
│           0.0 │        21.392 │
│          50.0 │        21.392 │
│          90.0 │        21.392 │
│          95.0 │        21.392 │
│          99.0 │        21.392 │
│          99.9 │        21.392 │
│         100.0 │        21.392 │
└───────────────┴───────────────┘
09:58:51 INFO: Request label stats:
┌────────┬────────┬─────────┬────────┬───────┐
│ label  │ status │    succ │ avg_rt │ error │
├────────┼────────┼─────────┼────────┼───────┤
│ addCar │   OK   │ 100.00% │ 21.402 │       │
└────────┴────────┴─────────┴────────┴───────┘
09:58:51 INFO: Dumping final status as CSV: /tmp/test-res.csv
09:58:51 INFO: Artifacts dir: /bzt/bzt_artifacts
09:58:51 INFO: Done performing with code: 0
09:58:51 INFO: Taurus CLI Tool v1.13.8
09:58:51 INFO: Starting with configs: ['/bzt-config/01_query.yml']
09:58:51 INFO: Configuring...
09:58:51 INFO: Artifacts dir: /bzt/bzt_artifacts
09:58:52 INFO: Preparing...
09:59:01 INFO: Starting...
09:59:01 INFO: Waiting for results...





09:59:54 WARNING: Please wait for graceful shutdown...
09:59:54 INFO: Shutting down...
09:59:54 INFO: Post-processing...
09:59:54 INFO: Test duration: 0:00:53
09:59:54 INFO: Samples count: 1, 0.00% failures
09:59:54 INFO: Average times: total 19.076, latency 19.076, connect 0.033
09:59:54 INFO: Percentiles:
┌───────────────┬───────────────┐
│ Percentile, % │ Resp. Time, s │
├───────────────┼───────────────┤
│           0.0 │        19.072 │
│          50.0 │        19.072 │
│          90.0 │        19.072 │
│          95.0 │        19.072 │
│          99.0 │        19.072 │
│          99.9 │        19.072 │
│         100.0 │        19.072 │
└───────────────┴───────────────┘
09:59:54 INFO: Request label stats:
┌────────┬────────┬─────────┬────────┬───────┐
│ label  │ status │    succ │ avg_rt │ error │
├────────┼────────┼─────────┼────────┼───────┤
│ getcar │   OK   │ 100.00% │ 19.076 │       │
└────────┴────────┴─────────┴────────┴───────┘
09:59:54 INFO: Test duration: 0:00:53
09:59:54 INFO: Samples count: 1, 0.00% failures
09:59:54 INFO: Average times: total 19.076, latency 19.076, connect 0.033
09:59:54 INFO: Percentiles:
┌───────────────┬───────────────┐
│ Percentile, % │ Resp. Time, s │
├───────────────┼───────────────┤
│           0.0 │        19.072 │
│          50.0 │        19.072 │
│          90.0 │        19.072 │
│          95.0 │        19.072 │
│          99.0 │        19.072 │
│          99.9 │        19.072 │
│         100.0 │        19.072 │
└───────────────┴───────────────┘
09:59:54 INFO: Request label stats:
┌────────┬────────┬─────────┬────────┬───────┐
│ label  │ status │    succ │ avg_rt │ error │
├────────┼────────┼─────────┼────────┼───────┤
│ getcar │   OK   │ 100.00% │ 19.076 │       │
└────────┴────────┴─────────┴────────┴───────┘

```



# Cryptography

## Aim
After completing this section you will:

+ understand how we encrypt/decrypt queries and mutations calls from graphql via lambda
+ be able to add encryption functionality to specific fields and extend the cryptography functionality of the system.


## Technology Used
+ Schema Directives. https://www.apollographql.com/docs/graphql-tools/schema-directives/
+ NodeJS Crypto Module https://nodejs.org/api/crypto.html

## How it is implementation (High Level)
+ Make specific field candidates for encryption/decryption by annotating them with @sensitive (Annotation driven approach achieved through the use of Schema directives.)
+ Call makeExecutableSchema with the @sensitive directive and its handlers (You can add multiple directive and handlers.)
+ In the schema directive handler, override the visitFieldDefinition and capture annotated fields
+ In the resolver, for queries, encrypt the annotated fields on the argument passed, retrieve the data and decrypt the values before passing back to graphql
+ In the resolver, for mutations, encrypt the annotated fields and store the encrypted form into the database.
+ An Injectable Cryptography service is used to perform encryption and decryption.


## Step 1: Make specific field candidates for encryption/decryption by annotating them with @sensitive

```
directive @sensitive on FIELD_DEFINITION

type Car {
_id: String!
 name : String @sensitive
}

```

## Step 2: Call makeExecutableSchema with the @sensitive directive
```
schema = makeExecutableSchema({
  typeDefs: allTypes,
  schemaDirectives: {
    sensitive: CryptographyDirective
  },
  resolvers: allResolvers
});
```

## Step 3: Capture Annotated fields in the Schema Directive Handler
```
export class CryptographyDirective extends SchemaDirectiveVisitor {
  public static fields: any = {};

  public visitFieldDefinition(
    field: GraphQLField<any, any>,
    details: {
      objectType: GraphQLObjectType | GraphQLInterfaceType;
    }
  ): GraphQLField<any, any> | void | null {
    const { resolve = defaultFieldResolver } = field;
    CryptographyDirective.fields[field.name] = true;
  }
}
```

## Step 4: Resolver - Crytography within queries
```
        console.log(`Quering with args ${JSON.stringify(args)}`);

        context.cryptographyService.recursiveCrypto(args, Cryptography.ENCRYPT);

        return context.sqlService
          .runQuery(Queries.SEARCH_CAR, [JSON.stringify(args)])
          .then(res => {
            console.log(`Database response is: ${JSON.stringify(res)}`);
            const result = context.cryptographyService.recursiveCrypto(
              res.rows.map(row => row.search),
              Cryptography.DECRYPT
            );
            console.log(`Result is: ${JSON.stringify(result)}`);

            return result;
          })
          .catch(e => console.error(e.stack));
```

## Step 5: Resolver - Cryptography within Mutations
```
      const sqlService: SQLService = context.sqlService;

      context.cryptographyService.recursiveCrypto(args, Cryptography.ENCRYPT);

      const id = args.car._id;

      const insert = JSON.stringify(args.car);

      console.log('Mutating with id "%s" and insert "%s"', id, insert);

      return sqlService
        .runQuery(Queries.MUTATE_CAR, [id, insert, id, insert])
        .then(res => {
          const response = JSON.parse('{"status": " 200 "}');

          return response;
        })
        .catch(e => console.error(e.stack));
```



## Cryptography Service

Encryption/Decryption Ciphers are created using the aes-256-cbc. This stack overflow entry explains it well. https://stackoverflow.com/questions/33121619/is-there-any-difference-between-aes-128-cbc-and-aes-128-encryption

To Encrypt

+ Within the NodeJS Crypto module, we generate the cipher with crypto.createCipheriv(algorithm, key, iv[, options]). For more information, see https://nodejs.org/api/crypto.html#crypto_crypto_createcipheriv_algorithm_key_iv_options
+ Then call cipher.update() passing it the data we are encrypting, for more information, see https://nodejs.org/api/crypto.html#crypto_cipher_update_data_inputencoding_outputencoding

 
To Decrypt

+ Within the NodeJS Crypto module, we generate the decipher with crypto.createDecipheriv(algorithm, key, iv[, options]). For more information, see https://nodejs.org/api/crypto.html#crypto_crypto_createdecipheriv_algorithm_key_iv_options
+ Then call decipher.update(), passing it the data we are decrypting, for more information, see https://nodejs.org/api/crypto.html#crypto_decipher_update_data_inputencoding_outputencoding






