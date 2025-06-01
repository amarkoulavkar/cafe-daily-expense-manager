// Example: BulkUpload.js
import React, { useState } from 'react';
import axios from 'axios';

const BulkUpload = ({ fetchExpenses }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = e => setFile(e.target.files[0]);

  const handleUpload = async e => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('file', file);
    await axios.post('http://localhost:5000/api/expenses/bulk-upload', formData);
    fetchExpenses();
    alert('Bulk upload complete!');
  };

  return (
    <form onSubmit={handleUpload}>
      <input type="file" accept=".xls,.xlsx" onChange={handleFileChange} required />
      <button type="submit">Upload Excel</button>
    </form>
  );
};

export default BulkUpload;