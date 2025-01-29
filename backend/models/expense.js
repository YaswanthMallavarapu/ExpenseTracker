import mongoose from "mongoose";

//schema
const ExpenseSchema = new mongoose.Schema({
  label: {
    type: String,
    required: true,
  },
  value: {
    type: Number,
    required: true,
  },
  date: {
    type: String,
    required: true,
  },
});

export default mongoose.model("Expense", ExpenseSchema);
