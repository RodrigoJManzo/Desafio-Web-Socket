const socket = io("http://localhost:8080")





socket.on(`todosProductos`, data =>{
    console.log(data)
})