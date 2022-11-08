import express from "express"
import {Server as HttpServer} from "http"
import {Server as SocketIOServer} from "socket.io"


// importo dayjs y agrego pluging CustomParseFormat
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
dayjs.extend(customParseFormat)

import Products from "./models/producto/modelProducto.js"
import Messages from "./models/Mensaje/modelMensaje.js"

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
    const allProducts = await Products.getAll()
    socket.emit(`todosProductos`, allProducts)
}

//Obtengo y Guardo Productos en el JSON de productoso usando modulo Porductos
const productSaver = async (newProducto)=>{
    await Products.save(newProducto)
    const allProducts = await Products.getAll()
    io.sockets.emit(`todosProductos`, allProducts)
}


//CHAT
//Obtengo y Propago Mensajes desde modulo mensajes
const sendMensajes = async (socket)=>{
    const allMsg = await Messages.getAll()
    socket.emit(`todosMensajes`, allMsg)
}

//Obtengo y Guardo mensajes en el JSON de mensajes
const messageSaver = async (mensaje)=>{
    const date = new Date()
    const fechaFormato = dayjs(date).format(`DD/MM/YYYY hh:mm:ss`)
    const newMensaje = {...mensaje, date: `${fechaFormato} hs `}
    await Messages.save(newMensaje)
    const messages = await Messages.getAll()
    io.sockets.emit(`todosMensajes`, messages)}