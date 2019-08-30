import { SQLService } from "@src/services/sql/SQLService";
import { CryptographyService } from "@src/services/security/cryptography.service";
import { CarService } from "@src/services/resolver/CarService";

export interface IAppContext {
  sqlService: SQLService;
  cryptographyService: CryptographyService;
  carService: CarService;
}
