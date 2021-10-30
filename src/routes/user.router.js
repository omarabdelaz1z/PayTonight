const { Router } = require("express");
const { registerKey } = require("../controllers/user.controller");

const router = Router();

router.post("/:userID", registerKey);

module.exports = router;
