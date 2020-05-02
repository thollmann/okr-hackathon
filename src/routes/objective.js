const express = require("express");
const { requiresAuth } = require("express-openid-connect");
const router = express.Router();

router.get("/objectives", requiresAuth(), async (req, res, next) => {
    res.send({ isAuthenticated: req.isAuthenticated() });
    // const { _raw, _json, ...userProfile } = req.user;
    // const groups = await Group.find({ ownerId: req.user.id });
    // res.render("group", {
    //     userProfile: JSON.stringify(userProfile, null, 2),
    //     title: `All groups for ${userProfile.displayName}`,
    //     groups: JSON.stringify(groups, null, 2),
    // });
});

router.post("/objectives", requiresAuth(), async (req, res, next) => {
    const { ...userProfile } = req.user;
    const ownerId = userProfile.id;
    const label = req.body.label;
    if (!label) throw new Error("INVALID_LABEL");

    const group = new Group({ label, ownerId });
    await group.save();

    res.redirect("/groups");
});

module.exports = router;
