const Expense = require('../models/Expense');

exports.index = (req, res) => {
  Expense.find({}, (err, expenseItems) => {
    if (err) throw err;
    res.render('expense/index', {
      title: 'Expense',
      expenseList: expenseItems
    });
  });
};  

/**
 * GET /expense/add
 * Add Expense page.
 */
exports.add = (req, res) => {
  res.render('expense/addexp', {
    title: 'Add Expense'
  });
};

/**
 * POST /expense/add
 * Add Expense Data.
 */
exports.addExpense = (req, res, next) => {
  const expense = new Expense({
    date: req.body.date,
    time: req.body.time,
    description: req.body.description,
    amount: req.body.amount,
    comment: req.body.comment
  });
  console.log('added Expense', JSON.stringify(expense));
  expense.save((err) =>{
    if(err) { return  next(err); }
    res.redirect('/expense');
  });
};
/**
 * GET /expense/edit
 * Edit Expense page.
 */
exports.edit = (req, res) => {
  res.render('expense/editexp', {
    title: 'Add Expense'
  });
};
/**
* POST /expense/edit
* Edit Expense Data.
*/
exports.updateExpense = (req, res, next) => {

  Expense.findById(req.expense.id, (err, expense) => {
    if (err) { return next(err); }
    expense.date = req.body.date || '';
    expense.time = req.body.time || '';
    expense.description = req.body.description || '';
    expense.amount = req.body.amount || '';
    expense.comment = req.body.comment || '';
    expense.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The expense you entered cannot update'});
          return res.redirect('/expense');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Expense has been updated.' });
      res.redirect('/expense');
    });
  });
};

/**
* POST /expense/delete
* Delete Expense Data.
*/
exports.delExpense = (req, res, next) => {
  Expense.findById(req.expense.id, (err, expense) => {
    expense.remove({ _id: req.expense.id }, (err) => {
      if (err) { return next(err); }
      req.flash('info', { msg: 'Expense Data has been deleted.' });
      res.redirect('/expense');
    });
  });  
};
