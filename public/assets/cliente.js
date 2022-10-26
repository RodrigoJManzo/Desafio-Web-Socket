const socket = io("http://localhost:8080")

//Productos
const formProductos = document.getElementById(`formProductos`)
const displayProductos = document.getElementById(`productDisplay`)

//Chat 

const chatForm = document.getElementById(`chat`)
const chatContainer = document.getElementById(`chatContainer`)

// PRODUCTOS

formProductos.addEventListener('submit', (e) =>{
    e.preventDefault()
    const data = new FormData(formProductos)
    const values = Object.fromEntries(data)
    formProductos.reset()
    socket.emit(`productoNuevo`, values)
    console.log(`Datos de Productos Recibidos`, values)
} )


socket.on(`todosProductos`, allProducts =>{
    muestraProductos(allProducts)
})


const muestraProductos = async (products) =>{
    const res = await fetch (`./../assets/templates/productsTemplate.handlebars`)
    const template = await res.text()
    const compiled = Handlebars.compile(template)
    const html = compiled({products})
    displayProductos.innerHTML = html
}


//CHAT

chatForm.addEventListener('submit', (e) =>{
    e.preventDefault()
    const data = new FormData(chatForm)
    const values = Object.fromEntries(data)
    chatForm.reset()
    socket.emit(`mensajeNuevo`, values)
    console.log(`Datos de Productos Recibidos`, values)
} )

socket.on(`todosMensajes`, allMsg =>{
    muestraMensajes(allMsg)
})

const muestraMensajes = async (messages) =>{
    const res = await fetch (`./../assets/templates/chatTemplate.handlebars`)
    const template = await res.text()
    const compiled = Handlebars.compile(template)
    const html = compiled({messages})
    chatContainer.innerHTML = html
}