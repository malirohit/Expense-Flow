import axios from "axios";
import { Expense } from "@/types/expense";

const backendUrl = import.meta.env.VITE_BACKEND_URL + '/api';

const api = axios.create({
  baseURL: backendUrl,
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("userToken");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const fetchExpenses = async (): Promise<Expense[]> => {
    
  const res = await api.get("/get-expenses-by-user");

  return res.data.expenses;
};

export const addExpense = async (
  category: string,
  amount: number,
  comments: string,
) => {
  const res = await api.post("/create-expense", {
    category,
    amount,
    comments,
  });

  

  return res.data.expense;
};

export const editExpense = async (
  id: string,
  category: string,
  amount: number,
  comments: string,
) => {
  const res = await api.put(`/update-expense/${id}`, {
    category,
    amount,
    comments,
  });

  return res.data.expense;
};

export const removeExpense = async (id: string) => {
  const res = await api.delete(`/delete-expense/${id}`);

  return res.data;
};
