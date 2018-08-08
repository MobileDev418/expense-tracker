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
  console.log('date', req.body.date);
  const expense = new Expense({
    date: JSON.stringify(req.body.date),
    time: req.body.time,
    description: req.body.description,
    amount: req.body.amount,
    comment: req.body.comment
  });
  console.log('added Expense', JSON.stringify(expense));
  expense.save((err) =>{
    if(err) { return  next(err); }
    req.flash('info', { msg: 'New expense has been added.' });
    res.redirect('/expense');
  });
};
/**
 * GET /expense/edit
 * Edit Expense page.
 */
exports.edit = (req, res, next) => {
  Expense.findOne({_id: req.params.id})
  .exec((err, expense) => {
    if (err) { return next(err); }
    res.render('expense/editexp', {
      title: 'Edit Expense',
      expItem: expense
    });
  });
};
/**
* POST /expense/edit
* Edit Expense Data.
*/
exports.updateExpense = (req, res, next) => {

  let expense = {
    date: req.body.date,
    time: req.body.time,
    description: req.body.description,
    amount: req.body.amount,
    comment: req.body.comment
  }
  Expense.updateOne({_id: req.params.id}, expense, function(err){
    if (err) { return next(err); }
    req.flash('info', { msg: 'Selected expense has been updated.' });
    res.redirect('/expense');
  });
};

/**
* POST /expense/delete
* Delete Expense Data.
*/
exports.delExpense = (req, res, next) => {
  Expense.deleteOne({ _id: req.params.id }, (err, expense) => {
    if (err) { return next(err); }
    req.flash('info', { msg: 'Selected expense has been deleted.' });
    res.redirect('/expense');
  });  
};
