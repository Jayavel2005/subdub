import  express from "express";
import {PORT} from "./config/env.js";
import authRouter from "./routes/auth.routes.js";
import userRouter from "./routes/user.route.js";
import subscriptionRouter from "./routes/subscription.routes.js";
import connectDatabase from "./database/mongodb.js";


const app = express();

app.use(express.json());
app.use('/api/v1/users', userRouter);
app.use('/api/v1/auth', authRouter);
app.use("/api/v1/subscription", subscriptionRouter);


app.get("/",(req, res)=>{
    res.send("Welcome to Subscription Tacker API!");
})



app.listen(PORT,async ()=>{
    console.log(`Subscription Tracker API is running on http://localhost:${PORT}`);

    await connectDatabase();
})


// mongodb+srv://jayavel:jayavel@cluster0a.sr4twyq.mongodb.net/?appName=Cluster0a