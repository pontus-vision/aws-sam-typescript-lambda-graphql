import {
  MutationUpdateCarArgs,
  QueryCarArgs,
  Car
} from "@src/interfaces/types";
import { IAppContext } from "@src/interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { Queries } from "@src/core/constants/Queries";
import * as format from "string-format/index.js";

const resolveFunctions = {
  Query: {
    car(_, args: QueryCarArgs, context: IAppContext): Promise<Car[]> {
      if (args.name) {
        return context.sqlService
          .runQuery(Queries.SEARCH_CAR + JSON.stringify(args), [])
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
      const query = format(Queries.MUTATE_CAR, id, insert, id, insert);

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
