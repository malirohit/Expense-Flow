import expenseModel from "../models/Expense.js";

const createExpense = async (req, res) => {
  const { category, amount, comments } = req.body;

  const userId = req.user._id;

  try {
    if (!category || !amount) {
      return res.status(400).json({
        success: false,
        message: "Category and amount are required",
      });
    }

    const expense = await expenseModel.create({
      userId,
      category,
      amount,
      comments,
    });

    res.status(201).json({
      success: true,
      message: "Expense created successfully",
      expense,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: error.message,
    });
  }
};

const getExpensesByUser = async (req, res) => {
  try {
    // const userId = req.user._id;

    // const expenses = await Expense.find({ userId: req.user.id }).sort({ createdAt: -1 });

    const expenses = await expenseModel
      .find({ userId: req.user._id })
      .sort({ createdAt: -1 });

    return res.status(200).json({
      success: true,
      expenses,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to fetch expenses",
    });
  }
};

const updateExpense = async (req, res) => {
    
  const { id } = req.params; // Expense Id

  // const { category, amount, comments } = req.body;

  try {
    const expense = await expenseModel.findByIdAndUpdate(
      { _id: id, userId: req.user._id },
      req.body,
      { new: true },
    );

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense updated successfully",
      expense,
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to update expense",
    });
  }
};

const deleteExpense = async (req, res) => {
  const { id } = req.params;

  try {
    const expense = await expenseModel.findOneAndDelete({
      _id: id,
      userId: req.user._id,
    });

    if (!expense) {
      return res.status(404).json({
        success: false,
        message: "Expense not found or unauthorized",
      });
    }

    res.status(200).json({
      success: true,
      message: "Expense deleted successfully",
    });
  } catch (error) {
    console.error(error);
    res.status(400).json({
      success: false,
      message: "Failed to delete expense",
    });
  }
};

export { createExpense, getExpensesByUser, updateExpense, deleteExpense };
