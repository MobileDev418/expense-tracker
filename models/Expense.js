const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: String,
  time: String,
  description: String,
  amount: String,
  comment: String,
}, { timestamps: true});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;