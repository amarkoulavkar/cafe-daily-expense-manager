const express = require('express');
const router = express.Router();
const Expense = require('../models/Expense');
const multer = require('multer');
const XLSX = require('xlsx');
const upload = multer({ dest: 'uploads/' });

// Add new expense
router.post('/', async (req, res) => {
  try {
    const expense = new Expense(req.body);
    await expense.save();
    res.status(201).json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Get all expenses
router.get('/', async (req, res) => {
  try {
    const expenses = await Expense.find().sort({ date: -1 });
    res.json(expenses);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

// Edit expense
router.put('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndUpdate(req.params.id, req.body, { new: true });
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json(expense);
  } catch (error) {
    res.status(400).json({ message: error.message });
  }
});

// Delete expense
router.delete('/:id', async (req, res) => {
  try {
    const expense = await Expense.findByIdAndDelete(req.params.id);
    if (!expense) return res.status(404).json({ message: 'Expense not found' });
    res.json({ message: 'Expense deleted' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

 router.post('/bulk-upload', upload.single('file'), async (req, res) => {
  try {
    const workbook = XLSX.readFile(req.file.path);
    const sheetName = workbook.SheetNames[0];
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet, { header: 1 }); // Get raw rows

    // data[0] = [ '', '01-05-2025', '02-05-2025', ... ]
    // data[1] = [ 'Revenue', 5528, 4467, ... ]
    // data[2] = [ 'Expenses', 2370, 1950, ... ]
    // data[3] = [ 'Reason For Expenses', 'milk(30),sakhr(420)', 'milk(30)', ... ]

    const dates = data[0].slice(1); // skip first empty cell
    const revenueRow = data.find(row => row[0] === 'Revenue');
    const expensesRow = data.find(row => row[0] === 'Expenses');
    const reasonRow = data.find(row => row[0] === 'Reason For Expenses');

    const expenses = [];
    let skipped = 0;

    dates.forEach((date, idx) => {
      const revenue = Number(revenueRow[idx + 1]);
      const expensesValue = Number(expensesRow[idx + 1]);
      const reason = reasonRow ? reasonRow[idx + 1] : '';

      if (!date || isNaN(revenue) || isNaN(expensesValue)) {
        skipped++;
        console.log('Skipping:', { date, revenue, expensesValue, reason });
        return;
      }

      let jsDate;
      if (typeof date === 'string' && date.includes('-')) {
        // Convert DD-MM-YYYY to YYYY-MM-DD
        const parts = date.split('-');
        jsDate = new Date(`${parts[2]}-${parts[1]}-${parts[0]}`);
      } else {
        jsDate = new Date(date);
      }

      expenses.push({
        date: jsDate,
        revenue,
        expenses: expensesValue,
        reason: reason || ''
      });
    });

    if (expenses.length > 0) {
      await Expense.insertMany(expenses);
    }
    res.json({ message: 'Bulk upload successful', added: expenses.length, skipped });
  } catch (error) {
    console.error('Bulk upload error:', error);
    res.status(500).json({ message: error.message });
  }
});
module.exports = router;