import express from 'express';
import { SigninController, SignUpController } from '../Controllers/UserController.js';

const UserRouter = express.Router();

UserRouter.post('/Signup', SignUpController);
UserRouter.post('/Signin' , SigninController);

export default UserRouter;