import { serverLite } from "./sqliteConnection"
const deleteAll = async () =>{
serverLite.from('productos').del()
    .then(()=> console.log('todos los productos fueron borrados'))
    .catch (error => {console.log(error); throw error})
    .finally(()=> serverLite.destroy())}

export default deleteAll