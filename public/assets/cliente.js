const socket = io("http://localhost:8080")


const formProductos = document.getElementById(`formProductos`)
const displayProductos = document.getElementById(`productDisplay`)

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