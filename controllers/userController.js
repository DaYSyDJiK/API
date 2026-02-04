const userService = require("../services/userService");
const bcrypt = require("bcrypt");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userService.getAllUsers();
    return res.status(200).json(users); 
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.getUserById = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message });
  }
};

exports.createUser = async (req, res) => {
  try {
    const { username, email, password } = req.body;

    // 1) Vérifications simples
    if (!username || !email || !password) {
      return res.status(400).json({ message: "username, email et password sont obligatoires" });
    }

    // 2) Hash du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10);

    // 3) On enregistre en base avec le hash
    const user = await userService.createUser({
      username,
      email,
      password: hashedPassword
    });

    return res.status(201).json(user);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};


exports.updateUser = async (req, res) => {
  try {
    const user = await userService.updateUser(req.params.id, req.body); // ✅ updateUser
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message }); // ✅ error.message
  }
};

// Afficher le formulaire pré-rempli (EJS)
exports.renderEditForm = async (req, res) => {
  try {
    const user = await userService.getUserById(req.params.id);
    if (!user) return res.status(404).send("Utilisateur non trouvé");
    return res.render("editUser", { user });
  } catch (error) {
    return res.status(500).send("Erreur serveur");
  }
};

exports.patchUser = async (req, res) => {
  try {
    const user = await userService.patchUser(req.params.id, req.body);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.json(user);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message }); // ✅
  }
};

exports.deleteUser = async (req, res) => {
  try {
    const user = await userService.deleteUser(req.params.id);
    if (!user) return res.status(404).json({ message: "Utilisateur introuvable" });
    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur", error: error.message }); // ✅
  }
};
