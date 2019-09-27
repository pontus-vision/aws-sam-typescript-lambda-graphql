import "zone.js";
import "reflect-metadata";
import { Server } from "@src/server";
import { AbstractLogger } from "./logger/AbstractLogger";
import { AbstractSetting } from "./config/AbstractSetting";
import { Setting } from "./config/Setting";
import { Logger } from "./logger/Logger";
import { Injector, ReflectiveInjector } from "injection-js";
import { SQLService } from "@src/services/sql/SQLService";
import { CryptographyService } from "@src/services/security/cryptography.service";

const injector: Injector = ReflectiveInjector.resolveAndCreate([
  { provide: AbstractLogger, useClass: Logger },
  { provide: AbstractSetting, useClass: Setting },
  SQLService,
  CryptographyService,
  Server
]);

export default injector;
