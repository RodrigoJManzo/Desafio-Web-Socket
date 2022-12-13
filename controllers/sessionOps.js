



const root = (req, res, next) =>{
    try {
        res.render('../public/assets/templates/formularioLogIn.handlebars')
        const formLogIn = document.getElementById(`formLogIn`)
        formLogIn.addEventListener('submit', (e) =>{
            e.preventDefault()
            const data = new FormData(formLogIn)
            const values = Object.fromEntries(data)
            formLogIn.reset()
            const nombre = values.username
            req.session.nombre = nombre
            //res.status(200).send(`${nombre}, Bienvenido!`)
            console.log(`Usuario Ingresado`, values)
            next()
        } )
    } catch (error) {
        console.log.apply(error)   
    }
}
const forget = (req, rs) =>{
    try {
        req.session.destroy();
        res.status(200). send ('Nos vemo luego')
    } catch (error) {
        res.send(500,'', error )
    }
}

export {root, forget}