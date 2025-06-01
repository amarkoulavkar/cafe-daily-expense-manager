import React, { useState } from 'react';
import axios from 'axios';

const ExpenseList = ({ expenses, fetchExpenses }) => {
  const [editingId, setEditingId] = useState(null);
  const [editForm, setEditForm] = useState({ date: '', revenue: '', expenses: '', reason: '' });

  const handleDelete = (id) => {
    axios.delete(`http://localhost:5000/api/expenses/${id}`)
      .then(() => fetchExpenses())
      .catch(err => console.error(err));
  };

  const handleEditClick = (exp) => {
    setEditingId(exp._id);
    setEditForm({
      date: exp.date ? exp.date.slice(0,10) : '',
      revenue: exp.revenue,
      expenses: exp.expenses,
      reason: exp.reason
    });
  };

  const handleEditChange = (e) => {
    setEditForm({ ...editForm, [e.target.name]: e.target.value });
  };

  const handleEditSubmit = (e) => {
    e.preventDefault();
    axios.put(`http://localhost:5000/api/expenses/${editingId}`, editForm)
      .then(() => {
        fetchExpenses();
        setEditingId(null);
      })
      .catch(err => console.error(err));
  };

  return (
    <div>
      <h2>Expense List</h2>
      <ul>
        {expenses.map(exp => (
          <li key={exp._id}>
            {editingId === exp._id ? (
              <form onSubmit={handleEditSubmit} style={{ display: 'inline' }}>
                <input name="date" type="date" value={editForm.date} onChange={handleEditChange} required />
                <input name="revenue" type="number" value={editForm.revenue} onChange={handleEditChange} required />
                <input name="expenses" type="number" value={editForm.expenses} onChange={handleEditChange} required />
                <input name="reason" value={editForm.reason} onChange={handleEditChange} />
                <button type="submit">Save</button>
                <button type="button" onClick={() => setEditingId(null)}>Cancel</button>
              </form>
            ) : (
              <>
                {exp.date ? new Date(exp.date).toLocaleDateString() : ''} - Revenue: ₹{exp.revenue} - Expenses: ₹{exp.expenses} - Reason: {exp.reason}
                <button onClick={() => handleEditClick(exp)} style={{ marginLeft: 8 }}>Edit</button>
                <button onClick={() => handleDelete(exp._id)} style={{ marginLeft: 4 }}>Delete</button>
              </>
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;