import {
  Car,
  MutationUpdateCarArgs,
  QueryCarArgs
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { Queries } from "../../core/constants/Queries";
import { Cryptography } from "../../core/constants/Cryptography";
import { CryptographyDirective } from "@src/directives/CryptographyDirective";

const resolveFunctions = {
  Query: {
    car(
      _,
      args: QueryCarArgs,
      context: IAppContext,
      info: any
    ): Promise<Car[]> {
      console.log(
        `Fields to be decrypted are: ${JSON.stringify(
          CryptographyDirective.fields
        )}`
      );

      if (Object.keys(args).length > 0) {
        console.log(`Quering with args ${JSON.stringify(args)}`);

        return context.sqlService
          .runQuery(Queries.SEARCH_CAR, [JSON.stringify(args)])
          .then(res => {
            const result = context.cryptographyService.recursiveCrypto(
              res.rows.map(row => row.search),
              Cryptography.DECRYPT
            );
            console.log(`Result is: ${JSON.stringify(result)}`);

            return result;
          })
          .catch(e => console.error(e.stack));
      } else {
        return context.sqlService
          .runQuery(Queries.SEARCH_CARS, [])
          .then(res => {
            const result = context.cryptographyService.recursiveCrypto(
              res.rows.map(row => row.search),
              Cryptography.DECRYPT
            );
            console.log(`Result is: ${JSON.stringify(result)}`);

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
    }
  }
};

export default resolveFunctions;
