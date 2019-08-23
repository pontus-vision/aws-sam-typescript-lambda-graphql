import { Injector } from "injection-js";
import { IAppContext } from "@src/interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";
import { EncryptDecryptService } from "@src/services/security/EncryptDecryptService";

export function getContext(injector: Injector): IAppContext {
  return {
    encryptDecryptService: injector.get(EncryptDecryptService),
    sqlService: injector.get(SQLService)
  };
}
