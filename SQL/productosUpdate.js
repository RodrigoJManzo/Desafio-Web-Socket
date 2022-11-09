import { dbServer } from "../models/dbConnection.js";

const update = async (id, titulo, precio, imagen)=>{
    await dbServer.from('productos').where('id', id).update({
        titulo: titulo,
        precio: precio,
        imagen: imagen
})
    .then((valores)=> console.log(`Se actualizaron los siguintes valores de ID ${id}, ${titulo}, ${precio}, ${imagen}`))
    .catch((error)=> console.log(error))
    .finally(()=>dbServer.destroy())
}

export default update    