import { dbServer } from "./dbConnection.js";
const getById = async (id)=>{
    try {
        await dbServer.from('productos').where('id',id).select()
            return(rows =>{
                rows.forEach(row =>{
                    console.log(`${row['id']} ${row['titulo']} ${row['precio']} ${row['imagen']}`)
                })
            })
    } catch (error) {
        console.log(error)
    }
    finally{(()=>dbServer.destroy())}
}

export default getById