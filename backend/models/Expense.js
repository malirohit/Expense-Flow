import mongoose from "mongoose";

const expenseSchema = new mongoose.Schema(
  {
    userId: { type: mongoose.Schema.Types.ObjectId, ref: "user" },
    category: String,
    amount: Number,
    comments: String,
  },
  {
    timestamps: true,
  },
);

const expenseModel =
  mongoose.models.expense || mongoose.model("expense", expenseSchema);

export default expenseModel;
