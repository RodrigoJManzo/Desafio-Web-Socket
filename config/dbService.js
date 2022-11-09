import knex from "knex";
import { config } from "./index.js";
import { DATASETS } from "./dataSet.js";

const KnexMySQL = knex(config.knex.mysql);
const KnexSqlite = knex(config.knex.sqlite);

const addDatasets = async (knexConnector, data, tableName) => {
  await knexConnector.insert(data).into(tableName);
};

const createProductTable = async (selectedKnex) => {
  try {
    const tableExist = await selectedKnex.schema.hasTable("productos");
    if (tableExist) return;

    await selectedKnex.schema.createTable("productos", (table) => {
      table.increments();
      table.string("titulo");
      table.float("precio");
      table.string("imagen");
    });

    await addDatasets(selectedKnex, DATASETS.products, "productos");
  } catch (error) {
    
    console.error(error);
  }
};

const createMessagesTable = async (selectedKnex) => {
  try {
    const tableExist = await selectedKnex.schema.hasTable("messages");
    if (tableExist) return;

    await selectedKnex.schema.createTable("messages", (table) => {
      table.increments("id");
      table.string("mensaje");
      table.string("date");
    });

    await addDatasets(selectedKnex, DATASETS.messages, "messages");
  } catch (error) {
    console.error(error);
  }
};

const init = async () => {
  
  await createProductTable(KnexMySQL);
  await createMessagesTable(KnexSqlite);
};

const KnexService = {
  init,
  KnexMySQL,
  KnexSqlite,
};

export { KnexService };