const slugify = require ('slugify');
const User = require ('../Models/useModel.js');
const asyncHandler = require ('express-async-handler');
const ApiError = require ('../Utils/ApiError');
const bcrypt = require ('bcryptjs');

module.exports.getAll = asyncHandler (async (req, res) => {
  const users = await User.find ();
  res.json ({Result: users.length, data: users});
});

module.exports.getOne = asyncHandler (async (req, res, next) => {
  const user = await User.findById (req.params.id);
  if (!user) {
    return next (new ApiError ('User not found', 404));
  }
  res.json ({data: user});
});

module.exports.createOne = asyncHandler (async (req, res) => {
  req.body.slug = slugify (req.body.user_name);
  const user = await User.create (req.body);
  res.json ({data: user, message: 'Success created'});
});

module.exports.updateOne = asyncHandler (async (req, res, next) => {
  if (req.body.user_name) {
    req.body.slug = slugify (req.body.user_name);
  }
  const user = await User.findByIdAndUpdate (req.params.id, {
    user_name: req.body.user_name,
    phone: req.body.phone,
    email: req.body.email,
    active: req.body.active,
    role: req.body.role,
    slug: req.body.slug,
  }, {
    new: true,
    runValidators: true,
  });
  if (!user) {
    return next (new ApiError ('User not found', 404));
  }

  res.json ({data: user, message: 'Success updated'});
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


module.exports.deleteOne = asyncHandler (async (req, res, next) => {
  const user = await User.findByIdAndDelete (req.params.id);
  if (!user) {
    return next (new ApiError ('User not found', 404));
  }
  res.json ({message: 'Success deleted'});
});
