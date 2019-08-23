import "zone.js";
import "reflect-metadata";
import { Server } from "../server";
import { AbstractLogger } from "./logger/AbstractLogger";
import { AbstractSetting } from "./config/AbstractSetting";
import { Setting } from "./config/Setting";
import { Logger } from "./logger/Logger";
import { Injector, ReflectiveInjector } from "injection-js";
import { SQLService } from "@src/services/sql/SQLService";
import { EncryptDecryptService } from "@src/services/security/EncryptDecryptService";

const injector: Injector = ReflectiveInjector.resolveAndCreate([
  { provide: AbstractLogger, useClass: Logger },
  { provide: AbstractSetting, useClass: Setting },
  SQLService,
  EncryptDecryptService,
  Server
]);

export default injector;
