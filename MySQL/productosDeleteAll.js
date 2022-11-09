import { dbServer } from "./dbConnection.js";
const deleteAll = async () =>{
dbServer.from('productos').del()
    .then(()=> console.log('todos los productos fueron borrados'))
    .catch (error => {console.log(error); throw error})
    .finally(()=> dbServer.destroy())}

export default deleteAll