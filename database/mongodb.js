import mongoose from "mongoose";
import {MONGODB_URI, NODE_ENV} from "../config/env.js";


if(!MONGODB_URI){
    throw new Error('Please define the mongodb URI environment variable inside .env<development/production>.local')
}

const connectDatabase =async () => {
    try {
        await mongoose.connect(MONGODB_URI);
        console.log(`Mongo DB connected in ${NODE_ENV} environment variable inside .env`);
    }catch (error){
        console.error('Error connecting to database',error);
    }
}

export default connectDatabase;