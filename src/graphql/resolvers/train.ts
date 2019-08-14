import { QueryTrainArgs, Train } from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";

const resolveFunctions = {
  Query: {
    train(_, args: QueryTrainArgs, context: IAppContext): Train[] {
      const sqlService: SQLService = context.sqlService;
      if (args.name) {
        return sqlService
          .runQuery(
            "SELECT search FROM VEHICLES.CAR WHERE search @> " +
              JSON.stringify(args),
            []
          )
          .then(res => {
            console.log(res.rows[0]);

            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
            return res.rows;
          })
          .catch(e => console.error(e.stack));
      } else {
        return sqlService
          .runQuery("SELECT search FROM VEHICLES.CAR", [])
          .then(res => {
            console.log(res.rows[0]);

            return res.rows;
          })
          .catch(e => console.error(e.stack));
      }
    }
  }
};

export default resolveFunctions;
