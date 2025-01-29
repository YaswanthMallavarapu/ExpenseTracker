import express from "express";
import Expense from "../models/expense.js";
const router = express.Router();

router.post("/", async (req, res) => {
  try {
    const { date, value, label } = req.body;

    if (!date || !value || !label) {
      return res
        .status(400)
        .json({ error: "date, value, and label are required" });
    }
    const newExpense = await Expense(req.body);
    const expense = await newExpense.save();
    res.status(201).json(expense);
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
router.get("/", async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ createdAt: -1 });
    res.status(200).json({ expenses });
  } catch (err) {
    res.status(500).json(err);
    console.log(err);
  }
});
router.put("/:id", async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    res.status(200).json(expense);
  } catch (err) {
    res.status(500).json(err);
  }
});
router.delete("/:id", async (req, res) => {
  try {
    await Expense.findByIdAndDelete(req.params.id);
    res.status(201).json("deleted sucessfully");
  } catch (err) {
    res.status(500).json(err);
  }
});

export default router;
