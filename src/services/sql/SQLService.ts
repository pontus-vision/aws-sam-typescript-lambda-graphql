import { AbstractLogger } from "../../core/logger/AbstractLogger";
import { Injectable } from "injection-js";
import { Pool } from "pg";

@Injectable()
export class SQLService {
  public static initialize() {
    SQLService.pool = new Pool();

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
    if (!SQLService.init) {
      SQLService.initialize();
      SQLService.init = true
    }
  }

  public runQuery(queryText: string, queryVals: string[]): any {
    this.logger.info("Returning SQL Conn ...");

    return SQLService.pool.query(queryText, queryVals);
  }
}
