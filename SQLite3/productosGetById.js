import { serverLite } from "./sqliteConnection"
const getById = async (id)=>{
    try {
        await serverLite.from('productos').where('id',id).select()
           return(rows =>{
                rows.forEach(row =>{
                    console.log(`${row['id']} ${row['titulo']} ${row['precio']} ${row['imagen']}`)
                })
            })
            
    } catch (error) {
        console.log(error)
    }
    finally{(()=>serverLite.destroy())}
}

export default getById