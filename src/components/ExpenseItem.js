
import React from 'react'
import { MdEdit, MdDelete } from 'react-icons/md'
const ExpenseItem = (props) => {
  const { id, charge, amount, handleDelete, handleEdit } = props
  return (
    <li className='item' id={id}>
      <div className='info'>
        <span className='expense'>{charge}</span>
        <span className='amount'>{amount}</span>
      </div>
      <button className='edit-btn' onClick={() => handleEdit(id)}>
        <MdEdit />
      </button>
      <button className='edit-btn' onClick={() => handleDelete(id)}>
        <MdDelete />
      </button>
    </li>
  )
}

export default ExpenseItem
