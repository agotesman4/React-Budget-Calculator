import React from "react";
import ExpenseItem from "./ExpenseItem";
import { MdDelete } from "react-icons/md";
const ExpenseList = ({ expenses, clearItems, handleDelete, handleEdit }) => {
  return (
    <>
      <ul className="list">
        {expenses.map(({ id, charge, amount, clearItems }) => (
          <ExpenseItem
            key={id}
            id={id}
            charge={charge}
            amount={amount}
            handleDelete={handleDelete}
            handleEdit={handleEdit}
          />
        ))}
      </ul>
      {expenses.length > 0 && (
        <button className="btn" onClick={clearItems}>
          Clear expenses <MdDelete className="btn-icon" />{" "}
        </button>
      )}
    </>
  );
};

export default ExpenseList;
