const express = require("express");
const router = express.Router();
const catwayController = require("../controllers/catwayController");


/**
 * Routes REST Catways.
 * @module routes/catwayRoutes
 */


// GET /catways
router.get("/", catwayController.getAllCatways);

// GET /catways/:id
router.get("/:id", catwayController.getCatwayByNumber);

// POST /catways
router.post("/", catwayController.createCatway);

// PUT /catways/:id
router.put("/:id", catwayController.updateCatwayState);

// DELETE /catways/:id
router.delete("/:id", catwayController.deleteCatway);

module.exports = router;
