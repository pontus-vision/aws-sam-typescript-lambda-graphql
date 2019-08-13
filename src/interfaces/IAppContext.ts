import {CarsService} from '../services/cars/CarsService'
import {TrainsService} from '../services/trains/TrainsService'
import {SQLService} from "@src/services/sql/SQLService";

export interface IAppContext {
  carsService: CarsService
  trainsService: TrainsService
  sqlService: SQLService
}
