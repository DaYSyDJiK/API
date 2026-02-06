const mongoose = require('mongoose');


/**
 * Modèle User.
 * - username : nom utilisateur
 * - email : unique
 * - password : hash bcrypt
 *
 * @module models/userModel
 */

const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, trim: true },
    email: { type: String, required: true, unique: true, lowercase: true, trim: true },
    password: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
