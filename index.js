import express from "express"
import {Server as HttpServer} from "http"
import {Server as SocketIOServer} from "socket.io"
import {MensajesSQL,ProductosSQL} from "./models/basesDatos.js"
import { engine } from 'express-handlebars'
import { fakeProducts } from "./data/faker.js"
import { testRouter } from "./routes/testRoute.js"
import cookieParser from "cookie-parser"

// importo dayjs y agrego pluging CustomParseFormat
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"
import session from "express-session"
import MongoStore from "connect-mongo"
dayjs.extend(customParseFormat)

let pathToFile = './data/Tests.json'
fakeProducts(pathToFile)

// import Products from "./models/producto/modelProducto.js"
// import Messages from "./models/Mensaje/modelMensaje.js"




const app = express ()
app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './public/assets/templates/');

const settingsMongo = {useNewsUrlParser:true, useUnifiedTopology:true}
const mongoURL = process.env.MONGO_URL || "mongodb+srv://user:<password>@rmanzo.rgeyn6w.mongodb.net/?retryWrites=true&w=majority";
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:`${mongoURL}?dbName=sesiones`,
        mongoOptions: settingsMongo,
        ttl:60,
        collectionName:'sessions'
    }),
    secret:'asd123',
    resave: false,
    saveUninitialized: false,
    cookie:{
        maxAge: 3600
    }
}))



const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)

const PORT = 8080
app.use(express.static(`./public`))
app.use("/api", testRouter)

httpServer.listen(PORT, ()=> console.log(`server corriendo en ${PORT}`))



//AUTOMATICAMENTE AL INICIAR CONEXION ENVIO MESAJES Y PRODUCTOS EN LA MEMORIA
io.on(`connection`, socket =>{
    sendProductos(socket)
    sendMensajes(socket)
    console.log(`Cliente nuevo conectado`)
    socket.on(`productoNuevo`, newProducto =>{
        productSaver(newProducto)
    })
    socket.on(`mensajeNuevo`, mensajeNuevo=>{
        messageSaver(mensajeNuevo)
    })
})


//PRODUCTOS
// Obtengo y Propago Productos 
const sendProductos = async (socket)=>{
    const allProducts = await ProductosSQL.getAll()
    socket.emit(`todosProductos`, allProducts)
}

//Obtengo y Guardo Productos 
const productSaver = async (newProducto)=>{
    await ProductosSQL.save(newProducto)
    const allProducts = await ProductosSQL.getAll()
    io.sockets.emit(`todosProductos`, allProducts)
}


//CHAT
//Obtengo y Propago Mensajes desde modulo mensajes
const sendMensajes = async (socket)=>{
    const allMsg = await MensajesSQL.getAll()
    socket.emit(`todosMensajes`, allMsg)
}

//Obtengo y Guardo mensajes 
const messageSaver = async (mensaje)=>{
    const date = new Date()
    const fechaFormato = dayjs(date).format(`DD/MM/YYYY hh:mm:ss`)
    const newMensaje = {...mensaje, date: `${fechaFormato} hs `}
    await MensajesSQL.save(newMensaje)
    const messages = await MensajesSQL.getAll()
    io.sockets.emit(`todosMensajes`, messages)}