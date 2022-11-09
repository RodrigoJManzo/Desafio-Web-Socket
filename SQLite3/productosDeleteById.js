import { serverLite } from "./sqliteConnection"
const delById = async (id)=>{
    try {
        await serverLite.from('productos').where('id',id).del()
            return ((val) => console.log('Producto Borrado: ',val))
    } 
    catch (error) {
        console.log(error)
    }
    finally{(()=>serverLite.destroy())}
}

export default delById