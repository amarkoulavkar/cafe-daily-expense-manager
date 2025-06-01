import React, { useState, useEffect } from 'react';
import ExpenseList from './components/ExpenseList';
import AddExpense from './components/AddExpense';
import ExpenseChart from './components/ExpenseChart';
import BulkUpload from './components/BulkUpload';

import axios from 'axios';

function App() {
  const [expenses, setExpenses] = useState([]);

  const fetchExpenses = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/expenses');
      setExpenses(res.data);
    } catch (err) {
      // Optionally handle error
    }
  };

  useEffect(() => {
    fetchExpenses();
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Cafe Expense Manager</h1>
     <AddExpense fetchExpenses={fetchExpenses} />
<ExpenseList expenses={expenses} fetchExpenses={fetchExpenses} />
<ExpenseChart expenses={expenses} />

<BulkUpload fetchExpenses={fetchExpenses} />
    </div>
  );
}

export default App;