import mongoose from 'mongoose';
import { db_url } from './ServerConfig.js';

export async function ConnectDb(){
    try {
        const response = await mongoose.connect(db_url);
        console.log("Database is connected");
    } catch (error) {
        console.log(error);
        console.log("Error occured");
    }
}