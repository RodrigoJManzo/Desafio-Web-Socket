const express = require("express")
const {Server : HttpServer} = require ("http")
const {Server : SocketIOServer} = require ('socket.io')

const productos = require (`./models/producto/modelProducto`)
const mensajes = require (`./models/Mensaje/modelMensaje`)

const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080
app.use(express.static(`./public`))

httpServer.listen(PORT, ()=> console.log(`server corriendo en ${PORT}`))

io.on(`connection`, socket =>{
    sendProductos(socket)
    sendMensajes(socket)
    socket.on(`productoNuevo`, newProducto =>{
        productSaver(newProducto)
    })
    socket.on(`mensajeNuevo`, mensajeNuevo=>{
        messageSaver(mensajeNuevo)
    })
})


//PRODUCTOS

const sendProductos = async (socket)=>{
    const allProducts = await productos.getAll()
    socket.emit(`todosProductos`, allProducts)
}


const productSaver = async (newProducto)=>{
    await productos.save(newProducto)
    const allProducts = await productos.getAll()
    io.sockets.emit(`todosProductos`, allProducts)
}


//CHAT

const sendMensajes = async (socket)=>{
    const allMsg = await mensajes.getAll()
    socket.emit(`todosMensajes`, allMsg)
}


const messageSaver = async (newMensaje)=>{
    await mensajes.save(newMensaje)
    const allMsg = await mensajes.getAll()
    io.sockets.emit(`todosMensajes`, allMsg)}