const express = require("express")
const {Server : HttpServer} = require ("http")
const {Server : SocketIOServer} = require ('socket.io')

const products = require (`./models/producto/modelProducto`)

const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080
app.use(express.static(`./public`))

httpServer.listen(PORT, ()=> console.log(`server corriendo en ${PORT}`))

io.on(`connection`, socket =>{
    sendProductos(socket)
})








const sendProductos = async (socket)=>{
    const allProducts = await products.getAll()
    socket.emit(`todosProductos`, allProducts)
}