import  express from "express";
import passport from "passport";

const router = express.Router()

router.post("/login",
passport.authenticate("logIn", {failureRedirect: "/logInFail"}),
(req,res)=>{
    res.redirect("/")
})


router.post("/register",
passport.authenticate("register", {failureRedirect:"/registerFail"}),
(req, res)=>{
    res.redirect("/")
})

router.get("/logInFail", (req,res)=>{
    res.render("login-error", {})
})

router.get("/registerFail", (req,res)=>{
    res.render("register-error", {})
})

router.get("/register", (req,res)=>{
    res.render("register", {})
})

router.get("/logOut", (req,res)=>{
    const {username} = req.user
    req.logOut();
    res.render("logOut", {username})
})

router.get("/logIn", (req,res)=>{
    if(req.isAuthenticated()){
        res.redirect("/")
    }else{
        res.render("logIn")
    }
})

router.get("/", (req,res)=>{
    if(req.isAuthenticated()){
        res.render("home", {usermame:req/user.username})
    }else{
        res.redirect("logIn")
    }
})

export default router