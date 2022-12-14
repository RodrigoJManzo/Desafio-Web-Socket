// express
import express from "express"
import { engine } from 'express-handlebars'
import session from "express-session"
import handlebars from "express-handlebars"
import router from "./routes/router.js"

// Mongo
import MongoStore from "connect-mongo"
import mongoose from "mongoose"

//socket io
import {Server as HttpServer} from "http"
import {Server as SocketIOServer} from "socket.io"

// Cookies & Session
import cookieParser from "cookie-parser"
import { routerSession } from "./routes/validateRoute.js"

// importo dayjs y agrego pluging CustomParseFormat
import dayjs from "dayjs"
import customParseFormat from "dayjs/plugin/customParseFormat.js"

// Passport
import passport from "passport"
import { Strategy as LocalStrategy } from "passport-local"
import {User} from './models/user.js'
import * as strategy from './passport/strategy.js'


//varios
import {MensajesSQL,ProductosSQL} from "./models/basesDatos.js"
import { fakeProducts } from "./data/faker.js"
import { testRouter } from "./routes/testRoute.js"


dayjs.extend(customParseFormat)

//ruta de archivo para Testeo de Mocking
let pathToFile = './data/Tests.json'
fakeProducts(pathToFile)

// App settings


const mongoURL = process.env.MONGO_URL || "mongodb+srv://user:asd123@rmanzo.rgeyn6w.mongodb.net/";

const app = express ()
app.use(cookieParser())
app.use(session({
    store: MongoStore.create({
        mongoUrl:mongoURL,
        ttl:600,
        collectionName:'sessions'
    }),
    secret:'secret',
    resave: false,
    saveUninitialized: false,
    rolling:false,
    cookie:{maxAge: 60000}
}))

app.engine('handlebars', engine());
app.set('view engine', 'handlebars');
app.set('views', './public/assets/views/');
app.use(express.urlencoded({extended:true}))
app.use(passport.initialize())
app.use(passport.session())
app.use("/", router)
app.use("/root/api", testRouter)
app.use(express.static(`./public`))

passport.use(
    "logIn", new LocalStrategy ({ passReqToCallback: true }, strategy.logIn)
)

passport.use(
    "register", new LocalStrategy ({passReqToCallback: true}, strategy.register)
)

passport.serializeUser((user, done)=>{
    done (null, user._id)
})

passport.deserializeUser((id, done)=>{
    User.findById(id, function (error, user){
        done(error, user)
    })
})

const PORT = process.env.PORT || 8080
const ServerConnect = app.listen(PORT, async ()=>{
    console.log(`Server Running on ${ServerConnect.address().port}`)
    try {
        await mongoose.connect(mongoURL, {})
        console.log("DB Connection OnLine")
    } catch (error) {
        console.log(`DB Connection went Wrong because : ${error}`)
    }
})
ServerConnect.on("error", (error)=> console.log(`Server Error ${error}`))
const httpServer = new HttpServer(app)
const io = new SocketIOServer(httpServer)


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