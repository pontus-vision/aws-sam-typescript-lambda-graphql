import {
  MutationUpdateCarArgs,
  QueryCarArgs,
  Car
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { Query } from "@src/core/constants/Constants";
import * as format from "../../../node_modules/string-format/index.js";

const resolveFunctions = {
  Query: {
    car(_, args: QueryCarArgs, context: IAppContext): Promise<Car[]> {
      if (args.name) {
        return context.sqlService
          .runQuery(Query.SEARCH_CAR + JSON.stringify(args), [])
          .then(res => {
            const result = res.rows.map(row => row.search);
            console.log(result);

            return result;
          })
          .catch(e => console.error(e.stack));
      } else {
        return context.sqlService
          .runQuery(Query.SEARCH_CARS, [])
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
      const query = format(Query.MUTATE_CAR, id, insert, id, insert);

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
