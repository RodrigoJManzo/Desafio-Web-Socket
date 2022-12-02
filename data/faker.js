import { faker } from '@faker-js/faker';
faker.locale = 'es'
import { writeFile } from 'fs'


let productos = []

const randomPorduct = () => faker.vehicle.model()
const randomPrecio = () => faker.random.numeric(3)
const randomImagen = () => faker.image.transport(640,480, true)

const fakeProducts = (pathToFile) =>{
    for (let i = 0; i < 6; i++) {
        const producto = {titulo: randomPorduct(), precio: randomPrecio(), imagen: randomImagen()}
        productos.push(producto)
    }
    writeFile(pathToFile, JSON.stringify(productos), err => {
        if (err) console.log(err);
        console.log('archivo guardado')
    }) 
}



export {fakeProducts}