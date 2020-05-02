const express = require("express");
const router = express.Router();
const controller = require("../controllers/team");

router.route("/teams").get(controller.list).post(controller.create);

router
    .route("/teams/:teamId")
    .patch(controller.patch)
    .delete(controller.delete);
module.exports = router;
