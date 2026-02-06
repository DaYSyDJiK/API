/**
 * Contrôleur REST pour la ressource User.
 * @module controllers/userController
 */

const userService = require("../services/userService");
const bcrypt = require("bcrypt");



/**
 * Liste tous les utilisateurs.
 * @route GET /api/users
 * @function getAllUsers
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Liste JSON des users
 */

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users); 
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};



/**
 * Récupère un utilisateur par son id Mongo.
 * @route GET /api/users/:id
 * @function getUserById
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} User JSON ou 404
 */

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};



/**
 * Crée un utilisateur (hash du mot de passe géré par le service).
 * @route POST /api/users
 * @function createUser
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} User créé (201) ou erreur (400)
 */

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email et password sont obligatoires" });
    }

    const user = await userService.createUser({ username, email, password });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



/**
 * Met à jour un utilisateur par id Mongo.
 * @route PUT /api/users/:id
 * @function updateUser
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} User mis à jour ou 404
 */

exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body); // ✅ updateUser
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message }); // ✅ error.message
  }
};



/**
 * Rend le formulaire EJS d'édition d'un utilisateur.
 * @function renderEditForm
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Page EJS ou 404
 */

exports.renderEditForm = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).send("Utilisateur non trouvé");
    return res.render("editUser", { user });
  } catch (error) {
    return res.status(500).send("Erreur serveur");
  }
};



/**
 * Mise à jour partielle (patch) d'un utilisateur.
 * @route PATCH /api/users/:id
 * @function patchUser
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} User patché ou 404
 */

exports.patchUser = async (req, res) => {
  try {
    const user = await userService.patchUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message }); // ✅
  }
};



/**
 * Supprime un utilisateur par id Mongo.
 * @route DELETE /api/users/:id
 * @function deleteUser
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} 204 si supprimé, 404 sinon
 */

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message }); // ✅
  }
};
