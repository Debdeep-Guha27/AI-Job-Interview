import express from 'express';
import { IsAuthenticated } from '../Middlewares/Authmiddleware.js';
import { QuestionController } from '../Controllers/QuestionsController.js';

const ModelRouter = express.Router();
ModelRouter.get('/getQuestions', IsAuthenticated, QuestionController);

export default ModelRouter;