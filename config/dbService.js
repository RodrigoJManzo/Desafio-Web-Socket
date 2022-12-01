import knex from "knex";
import { config } from "./index.js";
import { DATASETS } from "./dataSet.js";

const KnexMySQL = knex(config.knex.mysql);
//const KnexSqlite = knex(config.knex.sqlite);

const addDatasets = async (knexConnector, data, tableName) => {
  await knexConnector.insert(data).into(tableName);
};


const createProductTable = async () => {
  try {
    const tableExist = await KnexMySQL.schema.hasTable("products");
    if (tableExist) return;

    await KnexMySQL.schema.createTable("products", (table) => {
      table.increments();
      table.string("titulo");
      table.float("precio");
      table.string("imagen");
    });

    await addDatasets(KnexMySQL, DATASETS.products, "products");
  } catch (error) {
    
    console.error(error);
  }
};

createProductTable()

const createMessagesTable = async () => {
  try {
    const tableExist = await KnexMySQL.schema.hasTable("messages");
    if (tableExist) return;

    await KnexMySQL.schema.createTable("messages", (table) => {
      table.increments();
      table.string("email");
      table.string("text");
      table.timestamp('timestamp', undefined);
    });

    await addDatasets(KnexMySQL, DATASETS.messages, "messages");
  } catch (error) {
    console.error(error);
  }
};

createMessagesTable()


const init = async () => {
  await createProductTable();
  await createMessagesTable();
};

const KnexService = {
  init,
  KnexMySQL,
  //KnexSqlite,
};

export { KnexService };