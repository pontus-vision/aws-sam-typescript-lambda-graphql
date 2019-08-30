import { Injector } from "injection-js";
import { IAppContext } from "@src/interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { CryptographyService } from "@src/services/security/cryptography.service";
import { CarService } from "@src/services/resolver/CarService";

export function getContext(injector: Injector): IAppContext {
  return {
    cryptographyService: injector.get(CryptographyService),
    sqlService: injector.get(SQLService),
    carService: injector.get(CarService)
  };
}
