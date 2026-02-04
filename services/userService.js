const User = require('../models/userModel');

// Récupérer tous les utilisateurs
exports.getAllUsers = () => {
  return User.find();
};

// Récupérer un utilisateur par son id
exports.getUserById = (id) => {
  return User.findById(id);
};

// Créer un utilisateur
exports.createUser = (data) => {
  const user = new User(data);
  return user.save();
};

// Modifier complètement un utilisateur (PUT)
exports.updateUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

// Modifier partiellement un utilisateur (PATCH)
exports.patchUser = (id, data) => {
  return User.findByIdAndUpdate(id, data, { new: true });
};

// Supprimer un utilisateur
exports.deleteUser = (id) => {
  return User.findByIdAndDelete(id);
};
