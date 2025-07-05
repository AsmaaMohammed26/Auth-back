const express = require ('express');
const {
  getAll,
  getOne,
  createOne,
  updateOne,
  deleteOne,
  changePassword
} = require ('../Controllers/userController');

const {
  postUserValidator,
  putUserValidator,
  changePasswordValidator
} = require ('../Validators/userValidator');

const validateMW = require ('../Middlewares/validationMW');

const router = express.Router ();

router.get ('/', getAll);
router.get ('/:id', getOne);
router.post ('/', postUserValidator, validateMW, createOne);
router.put ('/change-password/:id',changePasswordValidator, validateMW ,changePassword);
router.put ('/:id', putUserValidator, validateMW, updateOne);
router.delete ('/:id', deleteOne);

module.exports = router;

