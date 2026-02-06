/**
 * Service Catway : couche d'accès aux données (MongoDB via Mongoose).
 * @module services/catwayService
 */

const Catway = require("../models/catwayModel");



/**
 * Récupère tous les catways.
 * @function getAllCatways
 * @returns {Promise<Array<import("../models/catwayModel")>>}
 */

exports.getAllCatways = () => {
  return Catway.find();
};



/**
 * Récupère un catway par son numéro.
 * @function getCatwayByNumber
 * @param {number} number Numéro de catway (catwayNumber)
 * @returns {Promise<Object|null>} Catway ou null
 */

exports.getCatwayByNumber = (number) => {
  return Catway.findOne({ catwayNumber: number });
};



/**
 * Crée un catway.
 * @function createCatway
 * @param {{catwayNumber:number, catwayType:"long"|"short", catwayState:string}} data
 * @returns {Promise<Object>} Catway créé
 */

exports.createCatway = (data) => {
  const catway = new Catway(data);
  return catway.save();
};



/**
 * Met à jour uniquement l'état du catway.
 * @function updateCatwayState
 * @param {number} number Numéro de catway
 * @param {string} state Nouvel état
 * @returns {Promise<Object|null>} Catway mis à jour ou null
 */

exports.updateCatwayState = (number, state) => {
  return Catway.findOneAndUpdate(
    { catwayNumber: number },
    { catwayState: state },
    { new: true }
  );
};



/**
 * Supprime un catway par numéro.
 * @function deleteCatway
 * @param {number} number Numéro de catway
 * @returns {Promise<Object|null>} Catway supprimé ou null
 */

exports.deleteCatway = (number) => {
  return Catway.findOneAndDelete({ catwayNumber: number });
};
