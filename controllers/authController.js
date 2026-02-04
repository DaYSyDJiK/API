const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).render("home", { error: "Email et mot de passe obligatoires" });
    }

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).render("home", { error: "Identifiants invalides" });
    }

    const ok = await bcrypt.compare(password, user.password);
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


exports.logout = (req, res) => {
  req.session.destroy(() => {
    return res.redirect("/");
  });
};

