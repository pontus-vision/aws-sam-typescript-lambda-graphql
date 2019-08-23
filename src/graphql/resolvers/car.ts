import {
  MutationUpdateCarArgs,
  QueryCarArgs,
  Car
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { Queries } from "../../core/constants/Queries";
import { EncryptDirective } from "@src/directives/EncryptDirective";

const resolveFunctions = {
  Query: {
    car(
      _,
      args: QueryCarArgs,
      context: IAppContext,
      info: any
    ): Promise<Car[]> {
      console.log('Quering with info "%s"\n\n\n', JSON.stringify(info));

      if (Object.keys(args).length > 0) {
        console.log('Quering with args "%s"', JSON.stringify(args));

        return context.sqlService
          .runQuery(Queries.SEARCH_CAR, [JSON.stringify(args)])
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

      for (const objKey of Object.keys(args.car)) {
        if (EncryptDirective.fields[objKey]) {
          console.log(`AAAAAA`);

          const initializationVector = context.encryptDecryptService.getInitializationVector(
            "the cat jumped"
          );
          const encryptionKey = context.encryptDecryptService.getEncryptionKey(
            "the cat jumped"
          );

          args.car[objKey] = context.encryptDecryptService.encrypt(
            initializationVector,
            encryptionKey,
            args.car[objKey]
          );

          console.log(
            `!!!!!!! encrypted field ${objKey} = ${args.car[objKey]}`
          );
        }
      }
      // EncryptDirective.fields = {};

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
    }
  }
};

export default resolveFunctions;
