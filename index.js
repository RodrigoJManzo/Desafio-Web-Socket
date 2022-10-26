const express = require("express")
const {Server : HttpServer} = require ("http")
const {Server : SocketIOServer} = require ('socket.io')

// importo dayjs y agrego pluging CustomParseFormat
const dayjs = require (`dayjs`)
const customParseFormat = require(`dayjs/plugin/customParseFormat`)
dayjs.extend(customParseFormat)

const productos = require (`./models/producto/modelProducto`)
const mensajes = require (`./models/Mensaje/modelMensaje`)

const app = express ()
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080
app.use(express.static(`./public`))

httpServer.listen(PORT, ()=> console.log(`server corriendo en ${PORT}`))

//AUTOMATICAMENTE AL INICIAR CONEXION ENVIO MESAJES Y PRODUCTOS EN LA MEMORIA
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
// Obtengo y Propago Productos usando modulo productos
const sendProductos = async (socket)=>{
    const allProducts = await productos.getAll()
    socket.emit(`todosProductos`, allProducts)
}

//Obtengo y Guardo Productos en el JSON de productoso usando modulo Porductos
const productSaver = async (newProducto)=>{
    await productos.save(newProducto)
    const allProducts = await productos.getAll()
    io.sockets.emit(`todosProductos`, allProducts)
}


//CHAT
//Obtengo y Propago Mensajes desde modulo mensajes
const sendMensajes = async (socket)=>{
    const allMsg = await mensajes.getAll()
    socket.emit(`todosMensajes`, allMsg)
}

//Obtengo y Guardo mensajes en el JSON de mensajes
const messageSaver = async (mensaje)=>{
    const date = new Date()
    const fechaFormato = dayjs(date).format(`DD/MM/YYYY hh:mm:ss`)
    const newMensaje = {...mensaje, date: `${fechaFormato} hs `}
    await mensajes.save(newMensaje)
    const messages = await mensajes.getAll()
    io.sockets.emit(`todosMensajes`, messages)}