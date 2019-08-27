import { Injector } from "injection-js";
import { IAppContext } from "@src/interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { CryptographyService } from "@src/services/security/cryptography.service";

export function getContext(injector: Injector): IAppContext {
  return {
    cryptographyService: injector.get(CryptographyService),
    sqlService: injector.get(SQLService)
  };
}
