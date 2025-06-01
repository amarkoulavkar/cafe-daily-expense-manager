import React, { useState } from 'react';
import axios from 'axios';

const AddExpense = ({ fetchExpenses }) => {
  const [form, setForm] = useState({
    date: '',
    revenue: '',
    expenses: '',
    reason: ''
  });

  const handleChange = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = async e => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/expenses', form);
      setForm({ date: '', revenue: '', expenses: '', reason: '' });
      fetchExpenses();
    } catch (err) {
      alert('Error adding expense');
    }
  };

  return (
    <form onSubmit={handleSubmit} style={{ marginBottom: '20px' }}>
      <input name="date" type="date" value={form.date} onChange={handleChange} required />
      <input name="revenue" type="number" placeholder="Revenue" value={form.revenue} onChange={handleChange} required />
      <input name="expenses" type="number" placeholder="Expenses" value={form.expenses} onChange={handleChange} required />
      <input name="reason" placeholder="Reason For Expenses" value={form.reason} onChange={handleChange} />
      <button type="submit">Add/Update Day</button>
    </form>
  );
};

export default AddExpense;