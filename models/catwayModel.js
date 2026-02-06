const mongoose = require("mongoose");


/**
 * Modèle Catway.
 * - catwayNumber : numéro unique
 * - catwayType : "long" | "short"
 * - catwayState : description de l'état
 *
 * @module models/catwayModel
 */

const catwaySchema = new mongoose.Schema(
  {
    catwayNumber: { type: Number, required: true, unique: true },
    catwayType: { type: String, required: true, enum: ["long", "short"] },
    catwayState: { type: String, required: true, trim: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Catway", catwaySchema);
