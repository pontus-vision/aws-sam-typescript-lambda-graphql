import { IAppContext } from "../../interfaces/IAppContext";
import { Queries } from "../../core/constants/Queries";
import { Cryptography } from "../../core/constants/Cryptography";
import { MutationUpdateCarArgs, QueryCarArgs } from "../../interfaces/types";

export class CarService {
  public searchAllCars(context: IAppContext) {
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

  public searchMatchingCar(args: QueryCarArgs, context: IAppContext) {
    console.log(`Quering with args ${JSON.stringify(args)}`);

    context.cryptographyService.recursiveCrypto(args, Cryptography.ENCRYPT);

    return context.sqlService
      .runQuery(Queries.SEARCH_CAR, [JSON.stringify(args)])
      .then(res => {
        console.log(`Database response is: ${JSON.stringify(res)}`);
        const result = context.cryptographyService.recursiveCrypto(
          res.rows.map(row => row.search),
          Cryptography.DECRYPT
        );
        console.log(`Result is: ${JSON.stringify(result)}`);

        return result;
      })
      .catch(e => console.error(e.stack));
  }

  public doUpdateCar(context: IAppContext, args: MutationUpdateCarArgs) {
    context.cryptographyService.recursiveCrypto(args, Cryptography.ENCRYPT);

    const insert = JSON.stringify(args.car);

    console.log('Mutating with id "%s" and insert "%s"', args.car._id, insert);

    return context.sqlService
      .runQuery(Queries.MUTATE_CAR, [
        args.car._id,
        insert,
        args.car._id,
        insert
      ])
      .then(res => {
        const response = JSON.parse('{"status": " 200 "}');

        return response;
      })
      .catch(e => console.error(e.stack));
  }
}
