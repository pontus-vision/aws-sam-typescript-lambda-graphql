import { SQLService } from "@src/services/sql/SQLService";
import { EncryptDecryptService } from "@src/services/security/EncryptDecryptService";

export interface IAppContext {
  sqlService: SQLService;
  encryptDecryptService: EncryptDecryptService;
}
