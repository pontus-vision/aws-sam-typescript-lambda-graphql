import {
  MutationUpdateTrainArgs,
  QueryTrainArgs,
  Train
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";

const resolveFunctions = {
  Query: {
    train(_, args: QueryTrainArgs, context: IAppContext): Promise<Train[]> {
      const sqlService: SQLService = context.sqlService;
      if (args.name) {
        return sqlService
          .runQuery(
            "SELECT search::jsonb FROM VEHICLES.Train WHERE search @> " +
              JSON.stringify(args),
            []
          )
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log(result);

            return result;
          })
          .catch(e => console.error(e.stack));
      } else {
        return sqlService
          .runQuery("SELECT search::jsonb FROM VEHICLES.Train", [])
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log(result);

            return result;
          })
          .catch(e => console.error(e.stack));
      }
    }
  },

  Mutation: {
    updateTrain(
      _,
      args: MutationUpdateTrainArgs,
      context: IAppContext,
      info: any
    ): Promise<Train> {
      const sqlService: SQLService = context.sqlService;
      const insert = JSON.stringify(args);
      const id = args._id;
      const name = args.name;
      const search = {
        name
      };
      const query =
        "INSERT INTO VEHICLES.Train(_id, search) values ('" +
        id +
        "','" +
        JSON.stringify(search) +
        "') ON CONFLICT (_id) DO UPDATE set _id = '" +
        id +
        "', search = '" +
        JSON.stringify(search) +
        "'";
      console.log("Args is: " + JSON.stringify(args));
      console.log("Query is: " + query);

      return sqlService
        .runQuery(query, [])
        .then(res => {
          const response = JSON.parse('{"status": " 200 "}');

          return response;
        })
        .catch(e => console.error(e.stack));
    }
  }
};

export default resolveFunctions;
