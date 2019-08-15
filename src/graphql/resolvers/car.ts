import {
  Car,
  MutationUpdateCarNameArgs,
  QueryCarArgs
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";

const resolveFunctions = {
  Query: {
    car(_, args: QueryCarArgs, context: IAppContext): Promise<Car[]> {
      // const carsService: CarsService = context.carsService
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
            console.log(res.rows);
            console.log(res.rows[0].search);

            return [res.rows[0].search];
          })
          .catch(e => console.error(e.stack));
      }

      // return carsService.getCars(args.name)
    }
  },

  Mutation: {
    updateCarName(
      _,
      args: MutationUpdateCarNameArgs,
      context: IAppContext
    ): Promise<Car> {
      const sqlService: SQLService = context.sqlService;

      return sqlService
        .runQuery("UPDATE VEHICLES.CAR SET search = " + '{"name": "Peter"}', [])
        .then(res => {
          console.log(res.rows[0]);

          // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
          return res.rows;
        })
        .catch(e => console.error(e.stack));

      // const carsService: CarsService = context.carsService

      // return carsService.updateCarName(args._id, args.newName)
    }
  }
};

export default resolveFunctions;
