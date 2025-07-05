const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const userSchema = new mongoose.Schema(
  {
    user_name: {
      type: String,
      trim: true,
      required: true,
      minlength: 3,
      maxlength: 25,
    },
    slug: {
      type: String,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
      match: [/.+\@.+\..+/, 'Please fill a valid email address'],
    },
    password: {
      type: String,
      required: true,
      minlength: 8,
      maxlength: 100,
    },
    role: {
      type: String,
      enum: ['user', 'admin'],
      default: 'user',
    },
    active: {
      type: Boolean,
      default: true,
    },
  },
  { timestamps: true }
);

userSchema.pre("save",async function(next){
  this.password = await bcrypt.hash(this.password,12);
  next();
})
module.exports = mongoose.model('users', userSchema);
