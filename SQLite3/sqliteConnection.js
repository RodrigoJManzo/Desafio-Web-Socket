import knex from 'knex';

const options = {
    client: 'sqlite3',
    connetction: {filename: '../db'}
}

const serverLite = knex(options) 

export {serverLite}