const { check } = require('express-validator');
const User = require('../Models/useModel');
const bcrypt = require('bcryptjs');

exports.postUserValidator = [
  check('user_name')
    .trim()
    .notEmpty()
    .withMessage('User name is required')
    .isLength({ min: 3, max: 25 })
    .withMessage('User name must be between 3 and 25 characters'),

  check('phone')
    .trim()
    .notEmpty()
    .withMessage('Phone number is required')
    .isMobilePhone()
    .withMessage('Invalid phone number'),

  check('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Invalid email format').custom( (email) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject('Email already exist');
        }
        return true;
      });
    }),

  check('password')
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 40 })
    .withMessage('Password must be between 8 and 40 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character'),

  check('confirmPassword')
    .notEmpty()
    .withMessage('Confirm password is required')
    .custom((value, { req }) => {
      if (value !== req.body.password) {
        throw new Error('confirm password does not match');
      }
      return true;
    }),

  check('active')
    .optional()
    .isBoolean()
    .withMessage('Active must be a boolean value'),

  check('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be admin or user')

];

exports.putUserValidator = [
  check('user_name')
    .optional()
    .trim()
    .isLength({ min: 3, max: 25 })
    .withMessage('User name must be between 3 and 25 characters'),

  check('phone')
    .optional()
    .trim()
    .isMobilePhone('ar-EG')
    .withMessage('Invalid phone number'),
 

  check('email')
    .optional()
    .trim()
    .isEmail()
    .withMessage('Invalid email format').custom( (email) => {
      return User.findOne({ email }).then((user) => {
        if (user) {
          return Promise.reject('Email already exist');
        }
      });
    }),

  check('active')
    .optional()
    .isBoolean()
    .withMessage('Active must be a boolean value'),

  check('role')
    .optional()
    .isIn(['admin', 'user'])
    .withMessage('Role must be admin or user')
];

module.exports.changePasswordValidator = [
  check('currentPassword')
    .trim()
    .notEmpty()
    .withMessage('Old password is required'),

  check('password')
    .trim()
    .notEmpty()
    .withMessage('Password is required')
    .isLength({ min: 8, max: 40 })
    .withMessage('Password must be between 8 and 40 characters')
    .matches(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).+$/)
    .withMessage('Password must contain uppercase, lowercase, number, and special character')
    .custom(async(value ,{req}) => {

      const user =await User.findById(req.params.id);
      if(!user){
        return Promise.reject('User not found');
      }
      const isMatch = await bcrypt.compare(req.body.currentPassword , user.password);
      if(!isMatch){
        return Promise.reject('Current password is incorrect');
      }

      if(value !== req.body.confirmPassword){
        return Promise.reject('Passwords do not match');
      }

      return true;
      
    })

      
    ,

  check('confirmPassword')
    .trim()
    .notEmpty()
    .withMessage('Confirm password is required')

]