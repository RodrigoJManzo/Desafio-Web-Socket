const express = require("express")
const {Server : HttpServer} = require ("http")
const {Server : SocketIOServer} = require ('socket.io')

const productos = require (`./models/producto/modelProducto`)

const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080
app.use(express.static(`./public`))

httpServer.listen(PORT, ()=> console.log(`server corriendo en ${PORT}`))

io.on(`connection`, socket =>{
    sendProductos(socket)
    socket.on(`productoNuevo`, newProducto =>{
        productSaver(newProducto)
    })
})


const sendProductos = async (socket)=>{
    const allProducts = await productos.getAll()
    socket.emit(`todosProductos`, allProducts)
}


const productSaver = async (newProducto)=>{
    await productos.save(newProducto)
    const allProducts = await productos.getAll()
    io.sockets.emit(`todosProductos`, allProducts)
}
