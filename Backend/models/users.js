const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const User = new mongoose.Schema(
  {
    fullName: { type: String, required: true },
    email:    { type: String, required: true, unique: true },
    password: { type: String },
    provider:   { type: String, enum: ['local', 'google'], default: 'local' },
    googleId:   { type: String, index: true, sparse: true },
    emailVerified: { type: Boolean, default: false },
  },
  { timestamps: true }
);

User.pre('save', async function (next) {
  if (!this.isModified('password') || !this.password) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

User.methods.comparePassword = async function (candidatePassword) {
  if (!this.password) return false;
  return bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', User);