import {AbstractLogger} from "@src/core/logger/AbstractLogger";
import {Injectable} from "injection-js";
import {Pool} from "pg";
import {RDS} from "aws-sdk";
import fs = require('fs');

@Injectable()
export class SQLService {
  public static initialize(logger: AbstractLogger) {
    
    const rdsSigner = new RDS.Signer();
    const PGUSER = "PGUSER";
    const PGHOST = "PGHOST";
    const PGPASSWORD = "PGPASSWORD";
    const PGPORT = "PGPORT";
    
    logger.info(`Before checking for PGPASS: ${!process.env[PGPASSWORD]} `);
  
  
    let config:any = {
    
    };
  
    if (!process.env[PGPASSWORD]){
      logger.info(`Got an empty pass; before rdsSigner.getAuthToken `);
      const awsRDSConfig = {
        // this object will be passed to the TLSSocket constructor
        ssl: {
          rejectUnauthorized: false,
          ca: fs.readFileSync('rds-combined-ca-bundle.pem').toString()
          // key: fs.readFileSync('/path/to/client-key/postgresql.key').toString(),
          // cert: fs.readFileSync('/path/to/client-certificates/postgresql.crt').toString(),
        },
      };
  
  
      process.env[PGPASSWORD] = rdsSigner.getAuthToken({
        username: process.env[PGUSER],
        hostname: process.env[PGHOST],
        port: +process.env[PGPORT],
        region: "eu-west-2"
      });
      
      config = { ... awsRDSConfig};
  
      logger.info(`after rdsSigner.getAuthToken() config: ${JSON.stringify(config)} `);
      logger.info(`after rdsSigner.getAuthToken() passwd: ${process.env[PGPASSWORD]} `);
      logger.info(`after rdsSigner.getAuthToken() username: ${process.env[PGUSER]} `);
      logger.info(`after rdsSigner.getAuthToken() hostname: ${process.env[PGHOST]} `);
      logger.info(`after rdsSigner.getAuthToken() port: ${process.env[PGPORT]} `);
  
      
  
    }

    SQLService.pool = new Pool(config);
    
    // the pool will emit an error on behalf of any idle clients
    // it contains if a backend error or network partition happens
    SQLService.pool.on("error", (err, client) => {
      console.error("Unexpected error on idle client", err);
      process.exit(-1);
    });
  }
  
  private static init: boolean = false;
  private static pool: Pool;
  
  constructor(private logger: AbstractLogger) {
    if (!SQLService.init)
    {
      this.logger.info("BEFORE INITIALIZER");
  
      SQLService.initialize(this.logger);
      this.logger.info("AFTER INITIALIZER");
  
      SQLService.init = true
    }
  }
  
  public runQuery(queryText: string, queryVals: string[]): any {
    this.logger.info("Returning SQL Conn ...");
    
    return SQLService.pool.query(queryText, queryVals);
  }
}
