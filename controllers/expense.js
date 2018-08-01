const User = require('../models/User');
const Expense = require('../models/Expense');

/**
 * GET /
 * Expense page.
 */
exports.getCash = (req, res) => {
  res.render('account/profile', {
    title: 'Account Management'
  });
};



 /**
  * GET /account
  * Expense page.
  */
 exports.getExpense = (req, res) => {
   res.render('expense', {
     title: 'Expense'
   });
 };

 /**
  * POST /account/profile
  * Update profile information.
  */
 exports.postUpdateProfile = (req, res, next) => {
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
  * POST /account/password
  * Update current password.
  */
 exports.postUpdatePassword = (req, res, next) => {
   req.assert('password', 'Password must be at least 4 characters long').len(4);
   req.assert('confirmPassword', 'Passwords do not match').equals(req.body.password);

   const errors = req.validationErrors();

   if (errors) {
     req.flash('errors', errors);
     return res.redirect('/account');
   }

   User.findById(req.user.id, (err, user) => {
     if (err) { return next(err); }
     user.password = req.body.password;
     user.save((err) => {
       if (err) { return next(err); }
       req.flash('success', { msg: 'Password has been changed.' });
       res.redirect('/account');
     });
   });
 };

 /**
  * POST /account/delete
  * Delete user account.
  */
 exports.postDeleteAccount = (req, res, next) => {
   User.remove({ _id: req.user.id }, (err) => {
     if (err) { return next(err); }
     req.logout();
     req.flash('info', { msg: 'Your account has been deleted.' });
     res.redirect('/');
   });
 };
