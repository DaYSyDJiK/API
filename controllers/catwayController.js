/**
 * Contrôleur REST pour la ressource Catway.
 * @module controllers/catwayController
 */

const catwayService = require("../services/catwayService");


/**
 * Récupère tous les catways.
 * @route GET /catways
 * @function getAllCatways
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Liste JSON des catways
 */

exports.getAllCatways = async (req, res) => {
  try {
    const catways = await catwayService.getAllCatways();
    return res.json(catways);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};



/**
 * Récupère un catway par son numéro (catwayNumber).
 * @route GET /catways/:id
 * @function getCatwayByNumber
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Catway JSON ou 404
 */

exports.getCatwayByNumber = async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const catway = await catwayService.getCatwayByNumber(number);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    return res.json(catway);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};



/**
 * Crée un catway.
 * @route POST /catways
 * @function createCatway
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Catway créé (201) ou erreur (400/500)
 */

exports.createCatway = async (req, res) => {
  try {
    const { catwayNumber, catwayType, catwayState } = req.body;

    if (!catwayNumber || !catwayType || !catwayState) {
      return res.status(400).json({ message: "Tous les champs sont obligatoires" });
    }

    const catway = await catwayService.createCatway({
      catwayNumber,
      catwayType,
      catwayState
    });

    return res.status(201).json(catway);
  } catch (error) {
    return res.status(400).json({ message: error.message });
  }
};



/**
 * Met à jour uniquement l'état d'un catway (catwayState).
 * Le numéro et le type ne sont pas modifiables.
 * @route PUT /catways/:id
 * @function updateCatwayState
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} Catway mis à jour ou 404
 */

exports.updateCatwayState = async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const { catwayState } = req.body;

    if (!catwayState) {
      return res.status(400).json({ message: "catwayState obligatoire" });
    }

    const catway = await catwayService.updateCatwayState(number, catwayState);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    return res.json(catway);
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};



/**
 * Supprime un catway par son numéro.
 * @route DELETE /catways/:id
 * @function deleteCatway
 * @async
 * @param {import("express").Request} req
 * @param {import("express").Response} res
 * @returns {Promise<void>} 204 si supprimé, 404 sinon
 */

exports.deleteCatway = async (req, res) => {
  try {
    const number = parseInt(req.params.id);
    const catway = await catwayService.deleteCatway(number);

    if (!catway) {
      return res.status(404).json({ message: "Catway introuvable" });
    }

    return res.status(204).send();
  } catch (error) {
    return res.status(500).json({ message: "Erreur serveur" });
  }
};
