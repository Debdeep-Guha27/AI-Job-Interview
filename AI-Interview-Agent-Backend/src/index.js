import express from 'express';
import { ConnectDb } from './Config/Dbconfig.js';
import UserRouter from './Routes/UserRouter.js';
import cors from 'cors';
import { IsAuthenticated } from './Middlewares/Authmiddleware.js';
import ModelRouter from './Routes/ModelRouter.js';
import InterviewRouter from './Routes/InterviewRouter.js';

const app = express();
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

app.get('/ping', IsAuthenticated , (req , res) => {
    return res.json({
        success:true,
        message:"Ping"
    });
});

app.use('/user', UserRouter);
app.use('/interview', ModelRouter);
app.use('/Interview/user', InterviewRouter);

app.listen(3000 , () => {
    console.log("Server is Running");
    ConnectDb();
});