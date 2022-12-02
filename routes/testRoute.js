import { Router } from "express";
import Test from "../models/test-route/modelTest.js"

const router = Router()

router.get('/productos-test', async (req, res)=>{
    
    try {
        const products = await Test.getAll()
        
        res.render("productsTemplate.handlebars", {products})
                
        
    } catch (error) {
        console.log(error)
    }
})


export {router as testRouter}