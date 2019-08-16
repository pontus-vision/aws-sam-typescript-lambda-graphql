export class Query {
  public static readonly SEARCH_TRAINS =
    "SELECT search::jsonb FROM VEHICLES.Train";
  public static readonly SEARCH_TRAIN =
    "SELECT search::jsonb FROM VEHICLES.Train WHERE search @>";
  public static readonly SEARCH_CARS = "SELECT search::jsonb FROM VEHICLES.Car";
  public static readonly SEARCH_CAR =
    "SELECT search::jsonb FROM VEHICLES.Car WHERE search @>";
  public static readonly MUTATE_TRAIN =
    "INSERT INTO VEHICLES.Train(_id, search) values ('{}', '{}') ON CONFLICT (_id) DO UPDATE set _id = '{}', search ='{}'";
  public static readonly MUTATE_CAR =
    "INSERT INTO VEHICLES.Car(_id, search) values ('{}', '{}') ON CONFLICT (_id) DO UPDATE set _id = '{}', search ='{}'";
}
