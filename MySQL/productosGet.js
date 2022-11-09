import { dbServer } from "./dbConnection.js";

const getAll = async () => { 
    await dbServer.from('productos').select('*')
    .then(rows =>{
        rows.forEach(row =>{
            console.log(`${row['id']} ${row['titulo']} ${row['precio']} ${row['imagen']}`)
        })
    })
    .catch(error => console.log(error))
    .finally(()=> dbServer.destroy())}


export default getAll