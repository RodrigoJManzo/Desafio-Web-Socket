const socket = io("http://localhost:8080")


const formProductos = document.getElementById(`formProductos`)

formProductos.addEventListener('submit', (e) =>{
    e.preventDefault()
    const data = new FormData(formProductos)
    const values = Object.fromEntries(data)
    formProductos.reset()
    socket.emit(`productoNuevo`, values)
    console.log(`Datos de Productos Recibidos`, values)
} )


socket.on(`todosProductos`, data =>{
    console.log(data)
})

