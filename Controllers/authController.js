const slugify = require ('slugify');
const User = require ('../Models/useModel.js');
const asyncHandler = require ('express-async-handler');
const ApiError = require ('../Utils/ApiError.js');
const bcrypt = require ('bcryptjs');
const jwt = require ('jsonwebtoken');

module.exports.signup = asyncHandler (async (req, res) => {
  req.body.slug = slugify (req.body.user_name);
  const user = await User.create (req.body);
  res.status (201).json ({ message: 'Success created'});
});

module.exports.signin = asyncHandler (async (req, res) => {
 
  const user = await User.findOne ({email: req.body.email}).select ('+password');
  const token = jwt.sign (
    {
      id: user._id,
      email: user.email,
      name: user.user_name,
      phone: user.phone,
      role: user.role,
    },
    process.env.JWT_SECRET_KEY,
    {
      expiresIn: process.env.JWT_EXPIRES_IN,
    }
  );
  res.status (200).json ({token, message: 'Success login'});
});

module.exports.changePassword = asyncHandler (async (req, res, next) => {
  const user = await User.findByIdAndUpdate (req.params.id, {
    password: await bcrypt.hash (req.body.password, 12),
  }, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next (new ApiError ('User not found', 404));
  }
  res.json ({data: user, message: 'Success updated'});
  }
  )



