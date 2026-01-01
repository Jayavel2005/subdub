import {Router} from "express";


const subscriptionRouter = Router();


subscriptionRouter.get('/', (req, res)=>{
    res.send("All subscriptions");
})

subscriptionRouter.get('/:id', (req, res)=>{
    res.send("Get details by id");
})

subscriptionRouter.post('/', (req, res)=>{
    res.send("Add subscription");
})

subscriptionRouter.put('/:id', (req, res)=>{
    res.send("update subscription");
})

subscriptionRouter.delete('/:id', (req, res)=>{
    res.send("delete subscription");
})

subscriptionRouter.get('/user/:id', (req, res)=>{
    res.send("Get all user subscriptions");
})

subscriptionRouter.put('/:id/cancel', (req, res)=>{
    res.send("cancel subscription");
})

subscriptionRouter.get("/upcoming", (req, res)=>{
    res.send("Upcoming subscription");
})

export  default  subscriptionRouter;