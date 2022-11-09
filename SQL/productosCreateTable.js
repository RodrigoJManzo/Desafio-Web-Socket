import { dbServer } from "../models/dbConnection.js";

const createTable = async() =>{
    await dbServer.schema.createTable('productos', table =>{
        table.increments('id')
        table.string('titulo')
        table.float('precio')
        table.text('imagen')
    })
    . then (a => console.log(`tabla creada ${a}`))
    .catch (error => console.log(error))
    .finally(()=> dbServer.destroy())
}


export default createTable
