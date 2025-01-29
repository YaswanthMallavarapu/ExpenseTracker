import express from "express";
import cors from "cors";
import mongoose from "mongoose";
import dotenv from "dotenv";
import ExpenseRoute from "./routes/expense.js";
dotenv.config();
const port = 8000;
//DB connection
mongoose
  .connect(
    "mongodb+srv://root:root@cluster0.wz6ob.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
  )

  .then((res) => {
    console.log("DB Connected");
  })
  .catch((err) => {
    console.log(err);
  });
//App
const app = express();
app.use(express.json());
app.use(cors({ origin: "http://localhost:5173" }));
//routing
app.use("/expenses", ExpenseRoute);

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
