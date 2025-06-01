import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart, ArcElement, Tooltip, Legend } from 'chart.js';

Chart.register(ArcElement, Tooltip, Legend);

const ExpenseChart = ({ expenses }) => {
  const totalRevenue = expenses.reduce((sum, exp) => sum + Number(exp.revenue), 0);
  const totalExpenses = expenses.reduce((sum, exp) => sum + Number(exp.expenses), 0);

  const data = {
    labels: ['Total Revenue', 'Total Expenses'],
    datasets: [
      {
        data: [totalRevenue, totalExpenses],
        backgroundColor: ['#36A2EB', '#FF6384'],
        hoverBackgroundColor: ['#36A2EB', '#FF6384'],
      },
    ],
  };

  return (
    <div style={{ maxWidth: 400, margin: '0 auto' }}>
      <h2>Revenue vs Expenses</h2>
      <Pie data={data} />
      <div style={{ marginTop: 16, textAlign: 'center' }}>
        <strong>Total Revenue:</strong> ₹{totalRevenue.toLocaleString()}<br />
        <strong>Total Expenses:</strong> ₹{totalExpenses.toLocaleString()}
      </div>
    </div>
  );
};

export default ExpenseChart;