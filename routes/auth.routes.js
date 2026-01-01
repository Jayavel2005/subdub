import { Router } from "express"


const  authRouter = Router();


authRouter.post('/signup', (req, res)=>{
    res.send("Signup successfully")
})

authRouter.post('/login', (req, res)=>{
    res.send("Login successfully")
})

authRouter.post('/logout', (req, res)=>{
    res.send("Logout successfully")
})


export  default authRouter;