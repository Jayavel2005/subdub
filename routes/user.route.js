import {Router} from "express";


const userRouter = Router();

userRouter.get('/', (req, res)=>{
    res.send("GET ALL Users");
})

userRouter.get('/:id',(req, res)=>{
    res.send("get user by id");
})

userRouter.post('/',(req, res)=>{
    res.send("Create new user");
})

userRouter.put('/:id',(req, res)=>{
    res.send("update user by id");
})


userRouter.delete('/:id', (req, res)=>{
    res.send("delete user by id");
})

export  default userRouter;