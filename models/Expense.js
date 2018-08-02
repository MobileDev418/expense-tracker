const mongoose = require('mongoose');

const expenseSchema = new mongoose.Schema({
  date: String,
  time: String,
  description: String,
  amount: String,
  comment: String,
}, { timestamps: true});

/**
 * Password hash middleware.
 */
expenseSchema.pre('save', function save(next) {
  if (err) { return next(err); }
  next();
});

const Expense = mongoose.model('Expense', expenseSchema);

module.exports = Expense;