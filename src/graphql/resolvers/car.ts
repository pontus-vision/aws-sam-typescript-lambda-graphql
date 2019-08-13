import {QueryCarArgs, Car, MutationUpdateCarNameArgs} from '../../interfaces/types'
import {CarsService} from '../../services/cars/CarsService'
import {IAppContext} from '../../interfaces/IAppContext'
import {SQLService} from "@src/services/sql/SQLService";

const resolveFunctions = {
  Query: {
    car(_, args: QueryCarArgs, context: IAppContext): Promise<Car[]> {
      // const carsService: CarsService = context.carsService
      const sqlService: SQLService = context.sqlService;
      if (args.name){
        return sqlService
          .runQuery("SELECT * FROM CARS WHERE name=$1", [args.name])
          .then(res => {
            console.log(res.rows[0]);
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
            return res.rows;
          })
          .catch(e => console.error(e.stack))
      }
      else {
        return sqlService
          .runQuery("SELECT * FROM CARS", [])
          .then(res => {
            console.log(res.rows[0]);
            // { name: 'brianc', email: 'brian.m.carlson@gmail.com' }
            return res.rows;
          })
          .catch(e => console.error(e.stack))
  
      }

      // return carsService.getCars(args.name)
    }
  },

  Mutation: {
    updateCarName(_, args: MutationUpdateCarNameArgs, context: IAppContext): Promise<Car> {
      const carsService: CarsService = context.carsService

      return carsService.updateCarName(args._id, args.newName)
    }
  }
}

export default resolveFunctions
