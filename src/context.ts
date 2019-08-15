import { Injector } from "injection-js";
import { IAppContext } from "@src/interfaces/IAppContext";
import { SQLService } from "@src/services/sql/SQLService";

export function getContext(injector: Injector): IAppContext {
  return {
    sqlService: injector.get(SQLService)
  };
}
