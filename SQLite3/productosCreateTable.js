import { serverLite } from "./sqliteConnection"

const createTable = async() =>{
    await serverLite.schema.createTable('productos', table =>{
        table.increments('id')
        table.string('titulo')
        table.float('precio')
        table.text('imagen')
    })
    . then (a => console.log(`tabla creada ${a}`))
    .catch (error => console.log(error))
    .finally(()=> serverLite.destroy())
}


export default createTable
