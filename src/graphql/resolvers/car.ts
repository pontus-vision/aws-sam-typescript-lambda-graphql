import {
  MutationUpdateCarArgs,
  QueryCarArgs,
  Car
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { Queries } from "../../core/constants/Queries";

const resolveFunctions = {
  Query: {
    car(_, args: QueryCarArgs, context: IAppContext): Promise<Car[]> {
      console.log("Args: " + JSON.stringify(args));
      if (args.name) {
        return context.sqlService
          .runQuery(Queries.SEARCH_CAR, [args.name])
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log("Filtered query result: " + result);

            return result;
          })
          .catch(e => console.error(e.stack));
      } else {
        return context.sqlService
          .runQuery(Queries.SEARCH_CARS, [])
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
    updateCar(
      _,
      args: MutationUpdateCarArgs,
      context: IAppContext,
      info: any
    ): Promise<Car> {
      const sqlService: SQLService = context.sqlService;
      const insert = JSON.stringify(args);
      const id = args._id;
      const name = args.name;

      return sqlService
        .runQuery(Queries.MUTATE_CAR, [id, insert, id, insert])
        .then(res => {
          const response = JSON.parse('{"status": " 200 "}');

          return response;
        })
        .catch(e => console.error(e.stack));
    }
  }
};

export default resolveFunctions;
