const User = require("../models/userModel");
const bcrypt = require("bcrypt");

// Récupérer tous les utilisateurs
exports.getAllUsers = () => User.find();

// Récupérer un utilisateur par son id
exports.getUserById = (id) => User.findById(id);

// Récupérer un utilisateur par email (utile pour les pages)
exports.getUserByEmail = (email) => User.findOne({ email });

// Créer un utilisateur (avec hash password)
exports.createUser = async (data) => {
  const { username, email, password } = data;

  // contrôles simples
  if (!username || !email || !password) {
    throw new Error("Tous les champs sont obligatoires");
  }
  if (password.length < 6) {
    throw new Error("Mot de passe trop court (min 6 caractères)");
  }

  // email unique
  const existing = await User.findOne({ email });
  if (existing) {
    throw new Error("Cet email est déjà utilisé");
  }

  const hashedPassword = await bcrypt.hash(password, 10);

  const user = new User({
    username,
    email,
    password: hashedPassword
  });

  return user.save();
};

// Modifier un utilisateur (sans casser le hash si password vide)
exports.updateUser = async (id, data) => {
  const update = { ...data };

  // si on envoie un password, on le hash
  if (update.password) {
    if (update.password.length < 6) {
      throw new Error("Mot de passe trop court (min 6 caractères)");
    }
    update.password = await bcrypt.hash(update.password, 10);
  } else {
    delete update.password; // ne pas écraser le password existant
  }

  return User.findByIdAndUpdate(id, update, { new: true });
};

// Patch (pareil que update ici)
exports.patchUser = exports.updateUser;

// Supprimer un utilisateur
exports.deleteUser = (id) => User.findByIdAndDelete(id);