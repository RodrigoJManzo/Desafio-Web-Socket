import { Router } from "express";

const router = Router()

router.get('/root', async (rec, res, next)=>{
    res.render('formularioLogIn.handlebars')
    try {
        const formLogIn = document.getElementById(`formLogIn`)
        formLogIn.addEventListener('submit', (e) =>{
            e.preventDefault()
            const data = new FormData(formLogIn)
            const values = Object.fromEntries(data)
            formLogIn.reset()
            const nombre = values.username
            req.session.nombre = nombre
            res.status(200).send(`${nombre}, Bienvenido!`)
            console.log(`Usuario Ingresado`, values)
            next()
        } )
    } catch (error) {
        console.log.apply(error)   
    }
    } );
router.get('/forget', async (req,res)=>{
    try {
        req.session.destroy();
        res.status(200). send ('Nos vemo luego')
    } catch (error) {
        res.send(500,'', error )
    }
})

export {router as routerSession}