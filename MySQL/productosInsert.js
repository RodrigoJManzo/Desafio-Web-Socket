import { dbServer } from "./dbConnection.js";





const save = async (title, price, image) => {
    try {
        await dbServer('productos').insert({titulo: title, precio: price, imagen: image})
    } catch (error) {
        console.log(error)
    }
    finally{()=>dbServer.destroy()}
}


export default save