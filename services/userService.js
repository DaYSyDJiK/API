/**
 * Service User : contrôles + hashing + accès aux données.
 * @module services/userService
 */

const User = require("../models/userModel");
const bcrypt = require("bcrypt");



/**
 * Récupère tous les utilisateurs.
 * @function getAllUsers
 * @returns {Promise<Array<Object>>}
 */

exports.getAllUsers = () => User.find();



/**
 * Récupère un utilisateur par id.
 * @function getUserById
 * @param {string} id Id Mongo
 * @returns {Promise<Object|null>}
 */

exports.getUserById = (id) => User.findById(id);



/**
 * Récupère un utilisateur par email.
 * @function getUserByEmail
 * @param {string} email Email
 * @returns {Promise<Object|null>}
 */

exports.getUserByEmail = (email) => User.findOne({ email });



/**
 * Crée un utilisateur avec validation et hash du password.
 * @function createUser
 * @async
 * @param {{username:string, email:string, password:string}} data
 * @throws {Error} Si champs manquants, password trop court, email déjà utilisé
 * @returns {Promise<Object>} User créé
 */

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



/**
 * Met à jour un utilisateur (hash password uniquement si fourni).
 * @function updateUser
 * @async
 * @param {string} id Id Mongo
 * @param {{username?:string, email?:string, password?:string}} data
 * @throws {Error} Si password fourni mais trop court
 * @returns {Promise<Object|null>} User mis à jour ou null
 */

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



/**
 * Mise à jour partielle (alias de updateUser).
 * @function patchUser
 */

exports.patchUser = exports.updateUser;



/**
 * Supprime un utilisateur.
 * @function deleteUser
 * @param {string} id Id Mongo
 * @returns {Promise<Object|null>}
 */

exports.deleteUser = (id) => User.findByIdAndDelete(id);