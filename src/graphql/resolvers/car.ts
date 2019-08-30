import {
  Car,
  MutationUpdateCarArgs,
  QueryCarArgs
} from "../../interfaces/types";
import { IAppContext } from "../../interfaces/IAppContext";

const resolvers = {
  Query: {
    car(
      _,
      args: QueryCarArgs,
      context: IAppContext,
      info: any
    ): Promise<Car[]> {
      if (Object.keys(args).length > 0) {
        return context.carService.searchMatchingCar(args, context);
      } else {
        return context.carService.searchAllCars(context);
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
      return context.carService.doUpdateCar(context, args);
    }
  }
};

export default resolvers;
