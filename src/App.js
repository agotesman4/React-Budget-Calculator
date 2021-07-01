import React, { useState, useEffect } from "react";
import uuid from "uuid/v4";
import "./App.css";
import ExpenseForm from "./components/ExpenseForm";
import ExpenseList from "./components/ExpenseList";
import Alert from "./components/Alert";

const initialExpenses = window.localStorage.getItem("expenses")
  ? JSON.parse(window.localStorage.getItem("expenses"))
  : [];

function App() {
  const [expenses, setExpenses] = useState(initialExpenses);
  const [charge, setCharge] = useState("");
  const [amount, setAmount] = useState(0);
  const [alert, setAlert] = useState({ show: false });
  const [edit, setEdit] = useState(false);
  const [id, setId] = useState(0);

  useEffect(() => {
    window.localStorage.setItem("expenses", JSON.stringify(expenses));
  }, [expenses]);

  const handleCharge = (e) => {
    setCharge(e.target.value);
  };

  const handleAmount = (e) => {
    setAmount(e.target.value * 1);
  };
  const handleAlert = ({ type, text }) => {
    setAlert({ show: true, type: type, text: text });
    setTimeout(() => {
      setAlert({ show: false });
    }, 3000);
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    if (charge !== "" && amount > 0) {
      if (edit) {
        const tempExpense = expenses.map((exp) => {
          return exp.id === id ? { ...exp, charge, amount } : exp;
        });
        setExpenses(tempExpense);
        setEdit(false);
        setId(0);
      } else {
        const newExpenses = [
          ...expenses,
          { id: uuid(), charge: charge, amount: amount },
        ];
        setExpenses(newExpenses);
      }
      setCharge("");
      setAmount("");
      handleAlert({ type: "success", text: "item added" });
    } else {
      handleAlert({
        type: "danger",
        text: "charge and amount cannot be empty value",
      });
    }
  };

  const clearItems = () => {
    setExpenses([]);
    handleAlert({ type: "danger", text: "All Items Deleted" });
  };
  const handleDelete = (id) => {
    const filteredExpenses = expenses.filter((exp) => exp.id !== id);
    setExpenses(filteredExpenses);
    handleAlert({ type: "danger", text: "An item Deleted" });
  };

  const handleEdit = (id) => {
    const expense = expenses.find((exp) => exp.id === id);
    if (expense) {
      setCharge(expense.charge);
      setAmount(expense.amount);
      setId(expense.id);
      setEdit(true);
    }
  };

  return (
    <>
      {alert.show && <Alert type={alert.type} text={alert.text} />}

      <h1>budget calculator</h1>
      <main className="App">
        <ExpenseForm
          charge={charge}
          amount={amount}
          handleCharge={handleCharge}
          handleAmount={handleAmount}
          handleSubmit={handleSubmit}
          edit={edit}
        />
        <ExpenseList
          expenses={expenses}
          clearItems={clearItems}
          handleDelete={handleDelete}
          handleEdit={handleEdit}
        />
      </main>
      <h1>
        total spending:
        <span className="total">
          {expenses.reduce((accu, item) => (accu += item.amount), 0)}&#8364;
        </span>
      </h1>
    </>
  );
}

export default App;
