/**
 * Contrôleur d'authentification (login/logout) via session.
 * @module controllers/authController
 */

const bcrypt = require("bcrypt");
const User = require("../models/userModel");

/**
 * Connecte un utilisateur avec email + password.
 * - Vérifie la présence des champs
 * - Cherche l'utilisateur en base
 * - Compare le password avec bcrypt
 * - Stocke l'utilisateur dans req.session.user
 * - Redirige vers /dashboard
 *
 * @function login
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Rend la page home avec erreur ou redirige vers /dashboard
 */

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).render("home", { error: "Email et mot de passe obligatoires" });
    }
    console.log("LOGIN BODY:", req.body);

    const user = await User.findOne({ email });
    console.log("USER FOUND?", !!user, user?.email);
    if (user) console.log("HASH IN DB:", user.password);
    if (!user) {
      return res.status(401).render("home", { error: "Identifiants invalides" });
    }

    if (user) {
      console.log("EMAIL DB:", user.email);
      console.log("HASH DB:", user.password);
    }
    const ok = await bcrypt.compare(password, user.password);
    console.log("BCRYPT OK?", ok);
    if (!ok) {
      return res.status(401).render("home", { error: "Identifiants invalides" });
    }

    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    };

    return res.redirect("/dashboard");
  } catch (error) {
    return res.status(500).render("home", { error: "Erreur serveur" });
  }
};


/**
 * Déconnecte l'utilisateur en détruisant la session.
 *
 * @function logout
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {void} Redirige vers /
 */

exports.logout = (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
};

