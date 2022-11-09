import { serverLite } from "./sqliteConnection"





const save = async (title, price, image) => {
    try {
        await serverLite('productos').insert({titulo: title, precio: price, imagen: image})
    } catch (error) {
        console.log(error)
    }
    finally{()=>serverLite.destroy()}
}


export default save