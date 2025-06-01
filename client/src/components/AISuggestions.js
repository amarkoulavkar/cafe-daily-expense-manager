import React, { useState } from 'react';
import axios from 'axios';

const AISuggestions = () => {
  const [loading, setLoading] = useState(false);
  const [suggestions, setSuggestions] = useState('');
  const [error, setError] = useState('');

  const fetchSuggestions = async () => {
    setLoading(true);
    setError('');
    setSuggestions('');
    try {
      const res = await axios.post('http://localhost:5000/api/expenses/suggestions');
      setSuggestions(res.data.suggestions);
    } catch (err) {
      setError('Failed to fetch suggestions.');
    }
    setLoading(false);
  };

  return (
    <div style={{ margin: '24px 0' }}>
      
      <h2>Expense Reduction Suggestions from AI</h2>
      <button onClick={fetchSuggestions} disabled={loading}>
        {loading ? 'Analyzing...' : 'Get Suggestions'}
      </button>
      {error && <div style={{ color: 'red', marginTop: 8 }}>{error}</div>}
      {suggestions && (
        <div style={{ marginTop: 16, whiteSpace: 'pre-line', background: '#f9f9f9', padding: 12, borderRadius: 4 }}>
          {suggestions}
        </div>
      )}
    </div>
  );
};

export default AISuggestions;