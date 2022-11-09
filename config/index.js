const DATABASES = {
  sql: { name: "sql" },
  };

const selectedDB = DATABASES.sql.name

const config = {
  SELECTED_DATABASE: DATABASES[selectedDB],
  DATABASES,
    knex: {
      mysql: {
        client: "mysql",
        connection: {
          host: "127.0.0.1",
          port:  3306,
          user:  "root",
          database: "productos",
        },
      },
      sqlite: {
        client: "sqlite3",
        connection: {
            filename: "../db",
        },
        useNullAsDefault: true
      },
    },
  };
  
  export { config };