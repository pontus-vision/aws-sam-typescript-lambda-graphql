export class Queries {
  public static readonly SEARCH_TRAINS =
    "SELECT search::jsonb FROM VEHICLES.Train";

  public static readonly SEARCH_TRAIN =
    "SELECT search::jsonb FROM VEHICLES.Train WHERE search->> 'name' = $1";

  public static readonly SEARCH_CARS = "SELECT search::jsonb FROM VEHICLES.Car";

  public static readonly SEARCH_CAR =
    "SELECT search::jsonb FROM VEHICLES.Car WHERE search->> 'name' = $1";

  public static readonly MUTATE_TRAIN =
    "INSERT INTO VEHICLES.Train(_id, search) values ($1, $2) ON CONFLICT (_id) DO UPDATE set _id = $3, search =$4";

  public static readonly MUTATE_CAR =
    "INSERT INTO VEHICLES.Car(_id, search) values ($1, $2) ON CONFLICT (_id) DO UPDATE set _id = $3, search =$4";
}
