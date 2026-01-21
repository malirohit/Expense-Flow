import express from 'express';
import authMiddleware from '../middleware/authMiddleware.js'
import {createExpense, getExpensesByUser, updateExpense, deleteExpense} from '../controllers/expenseController.js';

const expenseRouter = express.Router();

expenseRouter.post('/create-expense',authMiddleware,createExpense);
expenseRouter.get('/get-expenses-by-user',authMiddleware,getExpensesByUser);
expenseRouter.put('/update-expense/:id',authMiddleware,updateExpense);
expenseRouter.delete('/delete-expense/:id',authMiddleware,deleteExpense);

export default expenseRouter;