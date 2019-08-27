import { SQLService } from "@src/services/sql/SQLService";
import { CryptographyService } from "@src/services/security/cryptography.service";

export interface IAppContext {
  sqlService: SQLService;
  cryptographyService: CryptographyService;
}
