const express=require('express');
const {signup,signin}=require('../Controllers/authController');
const {signupValidator,signinValidator,changePasswordValidator}=require('../Validators/authValidator');
const validateMW=require('../Middlewares/validationMW');
const router=express.Router();

router.post('/signup',signupValidator,validateMW,signup);
router.post('/signin',signinValidator,validateMW,signin);
// router.post('/change-password/:id',changePasswordValidator,validateMW,signin);
module.exports=router;