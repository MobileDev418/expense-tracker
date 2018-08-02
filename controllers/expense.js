const User = require('../models/User');
const Expense = require('../models/Expense');

/**
 * GET /
 * Expense page.
 */
exports.getExpense = (req, res) => {
  const expenses = [];

  Expense.find({}, (err, expenseItems) => {
    if (err) throw err;

    expenseItems.forEach((expenseItem) => {
      const expense = {
        date: expenseItem.date,
        time: expenseItem.time,
        description: expenseItem.description,
        amount: expenseItem.amount,
        comment: expenseItem.comment
      };
      expenses.push(expense);
    });
    res.render('expense', {
      title: 'Expense',
      expenseList: expenses
    });
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
  expense.save((err) =>{
    if(err) { return  next(err); }
    res.redirect('/expense');
  });
};

/**
* POST /expense/update
* Update Expense Data.
*/
exports.updateExpense = (req, res, next) => {
  req.assert('email', 'Please enter a valid email address.').isEmail();
  req.sanitize('email').normalizeEmail({ gmail_remove_dots: false });

  const errors = req.validationErrors();

  if (errors) {
    req.flash('errors', errors);
    return res.redirect('/account');
  }

  User.findById(req.user.id, (err, user) => {
    if (err) { return next(err); }
    user.email = req.body.email || '';
    user.profile.name = req.body.name || '';
    user.profile.gender = req.body.gender || '';
    user.profile.location = req.body.location || '';
    user.profile.website = req.body.website || '';
    user.save((err) => {
      if (err) {
        if (err.code === 11000) {
          req.flash('errors', { msg: 'The email address you have entered is already associated with an account.' });
          return res.redirect('/account');
        }
        return next(err);
      }
      req.flash('success', { msg: 'Profile information has been updated.' });
      res.redirect('/account');
    });
  });
};

/**
* POST /expense/delete
* Delete Expense Data.
*/
exports.delExpense = (req, res, next) => {
  User.remove({ _id: req.user.id }, (err) => {
    if (err) { return next(err); }
    req.logout();
    req.flash('info', { msg: 'Expense Data has been deleted.' });
    res.redirect('/');
  });
};
