import { config } from "../config/index.js";
import {ContainerMySQL} from "./containerMySQL.js";
import { KnexService } from "../config/dbService.js";


const ALL_DATABASES = {
sql: () => {
    KnexService.init();
    return {
      ProductosSQL: new ContainerMySQL(KnexService.KnexMySQL, "products"),
      MensajesSQL: new ContainerMySQL(KnexService. KnexSqlite, "messages"),
    };
  },
};

export const { ProductosSQL, MensajesSQL } = ALL_DATABASES[config.SELECTED_DATABASE.name]();