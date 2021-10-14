const { Router } = require("express");
const { registerApp } = require("../controllers/dev.controller");

const router = Router();

router.get("/", (req, res) => res.render("dev"));
router.post("/", registerApp);

module.exports = router;
