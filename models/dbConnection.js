import knex from "knex"


const options = {
    client: 'mysql',
    connection: {
        host: '127.0.0.1',
        user: 'root',
        password: '',
        database: 'productos'
    }
}

const dbServer = knex(options)

export {dbServer}