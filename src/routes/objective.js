const express = require("express");
const router = express.Router();
const controller = require("../controllers/objective");

router.route("/objectives").get(controller.list).post(controller.create);

router
    .route("/objectives/:objectiveId")
    .patch(controller.patch)
    .delete(controller.delete);
module.exports = router;
