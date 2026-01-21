import React, { useState } from 'react';
import { Layout } from '@/components/Layout';
import { useExpenses } from '@/hooks/useExpenses';
import { ExpenseTable } from '@/components/ExpenseTable';
import { ExpenseForm } from '@/components/ExpenseForm';
import { StatsCards } from '@/components/StatsCards';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Plus, Loader2 } from 'lucide-react';
import { Expense } from '@/types/expense';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { fetchExpenses, addExpense, editExpense, removeExpense } from '@/api'

const Dashboard: React.FC = () => {

  // const { isLoading, totalExpenses, expensesByCategory } = useExpenses();
  const {
    data: expenses = [],
    isLoading,
  } = useQuery({
    queryKey: ['expenses'],
    queryFn: fetchExpenses,
  });

  const totalExpenses = expenses.reduce(
    (sum, expense) => sum + expense.amount,
    0
  );

  const expensesByCategory = expenses.reduce<Record<string, number>>(
    (acc, expense) => {
      acc[expense.category] = (acc[expense.category] || 0) + expense.amount;
      return acc;
    },
    {}
  );


  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingExpense, setEditingExpense] = useState<Expense | null>(null);

  const queryClient = useQueryClient();

  const fetchUserExpenses = () => {

  }

  const addExpenseMutation = useMutation({
    mutationFn: ({ category, amount, comments }: {
      category: string;
      amount: number;
      comments: string;
    }) => addExpense(category, amount, comments),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setIsAddDialogOpen(false);
    },
  });

  const editExpenseMutation = useMutation({
    mutationFn: ({ id, category, amount, comments }: {
      id: string;
      category: string;
      amount: number;
      comments: string;
    }) => editExpense(id, category, amount, comments),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
      setEditingExpense(null);
    },
  });

  const deleteExpenseMutation = useMutation({
    mutationFn: (id: string) => removeExpense(id),

    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['expenses'] });
    },
  });


  const handleAddExpense = async (
    category: string,
    amount: number,
    comments: string
  ) => {
    await addExpenseMutation.mutateAsync({
      category,
      amount,
      comments,
    });
  };

  const handleEditExpense = async (
    category: string,
    amount: number,
    comments: string
  ) => {
    if (!editingExpense) return;

    await editExpenseMutation.mutateAsync({
      id: editingExpense._id,
      category,
      amount,
      comments,
    });
  };

  const handleDeleteExpense = async (expense: Expense) => {
    await deleteExpenseMutation.mutateAsync(expense._id);
  };


  if (isLoading) {
    return (
      <Layout>
        <div className="flex items-center justify-center min-h-[400px]">
          <Loader2 className="h-8 w-8 animate-spin text-primary" />
        </div>
      </Layout>
    );
  }

  return (
    <Layout>
      <div className="space-y-8">

        {/* Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4">

          <div>
            <h1 className="text-3xl font-bold text-foreground">Dashboard</h1>
            <p className="text-muted-foreground mt-1">
              Manage and track your expenses
            </p>
          </div>

          <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
            <DialogTrigger asChild>
              <Button size="lg" className="shadow-lg">
                <Plus className="h-5 w-5 mr-2" />
                Add Expense
              </Button>
            </DialogTrigger>
            <DialogContent>

              <DialogHeader>
                <DialogTitle>Add New Expense</DialogTitle>
              </DialogHeader>

              <ExpenseForm onSubmit={handleAddExpense} onCancel={() => setIsAddDialogOpen(false)} />

            </DialogContent>
          </Dialog>
        </div>

        {/* Stats Cards */}
        <StatsCards
          totalExpenses={totalExpenses}
          expenseCount={expenses.length}
          expensesByCategory={expensesByCategory}
        />

        {/* Expense Table */}
        <ExpenseTable
          expenses={expenses}
          onEdit={setEditingExpense}
          onDelete={handleDeleteExpense}
        />

        {/* Edit Dialog */}
        <Dialog open={!!editingExpense} onOpenChange={(open) => !open && setEditingExpense(null)}>
          <DialogContent>
            <DialogHeader>
              <DialogTitle>Edit Expense</DialogTitle>
            </DialogHeader>
            {editingExpense && (
              <ExpenseForm
                expense={editingExpense}
                onSubmit={handleEditExpense}
                onCancel={() => setEditingExpense(null)}
              />
            )}
          </DialogContent>
        </Dialog>

      </div>
    </Layout>
  );
};

export default Dashboard;
