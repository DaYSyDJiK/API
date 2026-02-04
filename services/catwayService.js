const Catway = require("../models/catwayModel");

// Récupérer tous les catways
exports.getAllCatways = () => {
  return Catway.find();
};

// Récupérer un catway par son numéro
exports.getCatwayByNumber = (number) => {
  return Catway.findOne({ catwayNumber: number });
};

// Créer un catway
exports.createCatway = (data) => {
  const catway = new Catway(data);
  return catway.save();
};

// Modifier uniquement l'état d'un catway
exports.updateCatwayState = (number, state) => {
  return Catway.findOneAndUpdate(
    { catwayNumber: number },
    { catwayState: state },
    { new: true }
  );
};

// Supprimer un catway
exports.deleteCatway = (number) => {
  return Catway.findOneAndDelete({ catwayNumber: number });
};
