import { dbServer } from "./dbConnection.js";
const delById = async (id)=>{
    try {
        await dbServer.from('productos').where('id',id).del()
            return ((val) => console.log('Producto Borrado: ',val))
            
    } catch (error) {
        console.log(error)
    }
    finally{(()=>dbServer.destroy())}
}

export default delById