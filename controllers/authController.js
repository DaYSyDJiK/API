const bcrypt = require("bcrypt");
const User = require("../models/userModel");

exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1) Vérif simple
    if (!email || !password) {
      return res.status(400).json({ message: "email et password sont obligatoires" });
    }

    // 2) Chercher l'utilisateur par email
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 3) Comparer password tapé vs hash en base
    const ok = await bcrypt.compare(password, user.password);
    if (!ok) {
      return res.status(401).json({ message: "Identifiants invalides" });
    }

    // 4) Stocker un petit objet en session (pas de password)
    req.session.user = {
      id: user._id.toString(),
      username: user.username,
      email: user.email
    };

    // 5) Réponse
    return res.status(200).json({ message: "Connecté", user: req.session.user });
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    // On peut rediriger vers "/" quand on fera le front
    return res.status(200).json({ message: "Déconnecté" });
  });
};
