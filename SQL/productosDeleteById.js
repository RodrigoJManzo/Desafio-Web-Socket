import { dbServer } from "../models/dbConnection.js";
const delById = async (id)=>{
    try {
        await dbServer.from('productos').where('id',id).del()
            .then((val) => console.log('Producto Borrado: ',val))
            .catch(err => { console.log(err);  })
            .finally(() => baseDeDatos.destroy())
    } catch (error) {
        console.log(error)
    }
    finally{(()=>dbServer.destroy())}
}

export default delById