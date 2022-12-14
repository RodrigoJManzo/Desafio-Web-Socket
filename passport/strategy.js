import {User} from "../models/user.js"
import bCrypt from "bcrypt"

const validator = (user, password)=>{
    return bCrypt.compareSync(password, user.password)
}

const createHash = (password) => {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null)
}

const logIn = (req, username, password, done)=>{
    User.findOne({username:username}, (error, user)=>{
        if (error) return done(error)
        if(!user){
            console.log("Usuario no encontrado" + username)
            return done(null, false)
        }
        if(!validator(user, password)){
            console.log('Su calve es invalida')
            return done(null, false)
        }
        return done(null, user)
    })
}

const register = (req, username, password, done) =>{
        User.findOne({username:username}, (error, user)=>{
            if(error){
                console.log("Sign Up Error"+ error)
                return done(error);
            }
            if (user){
                console.log('This User is Already in Our DB')
                return done (null, false)
            }else{
                const newUser = new User()
                newUser.username = username
                newUser.password = createHash(password)
                newUser.save().then(datos => done(null, datos)).catch(null,false) 
            }
        })
    }

const logout = (username, done)=>{
    if(error){
        console.log(error)
        return done(error)
    }else{
        username = User.username
        console.log(`YOU ARE LOGGED OUT ${username}`)
    }
}


export {logIn, register, logout}