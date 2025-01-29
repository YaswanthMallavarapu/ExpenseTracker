import { useEffect, useState } from "react";
import { FaTrash, FaEdit, FaWindowClose } from "react-icons/fa";
import { PieChart } from "@mui/x-charts/PieChart";
import { publicRequest } from "./requestMethods";
import "./App.css";

function App() {
  const [showAddExpense, setShowAddExpense] = useState(false);
  const [showAddChart, setShowChart] = useState(false);
  const [showEdit, setShowEdit] = useState(false);
  const [label, setLabel] = useState("");
  const [amount, setAmount] = useState("");
  const [date, setDate] = useState("");
  const [expenses, setExpenses] = useState([]);
  const [updatedId, setUpdatedId] = useState("");
  const [updatedLabel, setUpdatedLabel] = useState("");
  const [updatedAmount, setUpdatedAmount] = useState("");
  const [updatedDate, setUpdatedDate] = useState("");
  const [searchQuery, setSearchQuery] = useState(""); // State for search input

  const handleAddExpense = () => {
    setShowAddExpense(!showAddExpense);
  };
  const handleShowChart = () => {
    setShowChart(!showAddChart);
  };
  const handleShowEdit = (id) => {
    setShowEdit(!showEdit);
    setUpdatedId(id);
  };
  const handleExpense = async () => {
    try {
      await publicRequest.post("/expenses", {
        label,
        date,
        value: amount,
      });
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  useEffect(() => {
    const getExpenses = async () => {
      try {
        const res = await publicRequest.get("/expenses");
        setExpenses(res.data.expenses);
      } catch (err) {
        console.log(err);
      }
    };
    getExpenses();
  }, []);

  const handleDelete = async (id) => {
    try {
      await publicRequest.delete(`/expenses/${id}`);
      window.location.reload();
    } catch (err) {
      console.log(err);
    }
  };

  const updateExpense = async () => {
    if (updatedId) {
      try {
        await publicRequest.put(`/expenses/${updatedId}`, {
          value: updatedAmount,
          label: updatedLabel,
          date: updatedDate,
        });
        window.location.reload();
      } catch (err) {
        console.log(err);
      }
    }
  };

  // Filtered expenses based on the search query
  const filteredExpenses = expenses.filter((item) =>
    item.label.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="container1">
      <div className="container">
        <h1>Expense Tracker</h1>
      </div>
      <div className="buttons">
        <div>
          <button className="addexpensebtn" onClick={handleAddExpense}>
            Add Expense
          </button>
          <button className="addexpensebtn-2" onClick={handleShowChart}>
            Expense Report
          </button>
        </div>

        <div>
          <input
            type="text"
            placeholder="Search"
            className="search"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update searchQuery
          />
        </div>

        {showAddExpense && (
          <div className="expenseAdd">
            <FaWindowClose className="into" onClick={handleAddExpense} />
            <label htmlFor="" className="addinput">
              Expense Name
            </label>
            <input
              type="text"
              className="input"
              onChange={(e) => setLabel(e.target.value)}
            />
            <label htmlFor="" className="addinput">
              Expense Date
            </label>
            <input
              className="input"
              placeholder="dd/mm/yyyy"
              type="date"
              onChange={(e) => setDate(e.target.value)}
            />
            <label htmlFor="" className="addinput">
              Expense Amount
            </label>
            <input
              type="text"
              className="input"
              onChange={(e) => setAmount(e.target.value)}
            />

            <button className="add" onClick={handleExpense}>
              Add Expense
            </button>
          </div>
        )}

        {showAddChart && (
          <div className="showChart">
            <FaWindowClose className="into" onClick={handleShowChart} />
            <PieChart
              series={[
                {
                  data: expenses,
                  innerRadius: 30,
                  outerRadius: 100,
                  paddingAngle: 5,
                  cornerRadius: 5,
                  startAngle: -45,
                  endAngle: 225,
                  cx: 150,
                  cy: 150,
                },
              ]}
            />
          </div>
        )}
        {showEdit && (
          <div className="expenseEdit">
            <FaWindowClose className="into" onClick={handleShowEdit} />
            <label htmlFor="" className="addinput">
              Expense Name
            </label>
            <input
              type="text"
              className="input"
              onChange={(e) => setUpdatedLabel(e.target.value)}
            />
            <label htmlFor="" className="addinput">
              Date
            </label>
            <input
              className="input"
              placeholder="dd/mm/yyyy"
              type="date"
              onChange={(e) => setUpdatedDate(e.target.value)}
            />
            <label htmlFor="" className="addinput">
              Amount
            </label>
            <input
              type="text"
              className="input"
              onChange={(e) => setUpdatedAmount(e.target.value)}
            />

            <button className="add" onClick={updateExpense}>
              Update Expense
            </button>
          </div>
        )}
      </div>
      <div className="expenses">
        {filteredExpenses.map((item, index) => (
          <div className="card" key={index}>
            <div>
              <h2 className="title">{item.label}</h2>
            </div>
            <div className="date">{item.date}</div>
            <div className="amount">RS.{item.value}</div>
            <div className="options">
              <FaEdit onClick={() => handleShowEdit(item._id)} />
              <FaTrash onClick={() => handleDelete(item._id)} />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
