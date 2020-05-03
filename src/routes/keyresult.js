const express = require("express");
const router = express.Router();
const controller = require("../controllers/keyresult");

router.route("/objectives/:objectiveId/keyresults").post(controller.create);

router
    .route("/objectives/:objectiveId/keyresults/:keyResultId")
    .patch(controller.patch)
    .delete(controller.delete);

module.exports = router;
