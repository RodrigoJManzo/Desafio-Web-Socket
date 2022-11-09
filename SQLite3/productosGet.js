import { serverLite } from "./sqliteConnection"

const getAll = async () => { 
    await serverLite.from('productos').select('*')
    .then(rows =>{
        rows.forEach(row =>{
            console.log(`${row['id']} ${row['titulo']} ${row['precio']} ${row['imagen']}`)
        })
    })
    .catch(error => console.log(error))
    .finally(()=> serverLite.destroy())}


export default getAll