const { Router } = require("express");
const { findUser, createUser } = require("../controllers/user.controller");

const router = Router();
// TODO: prepare routes

router.post("/create", createUser);
router.post("/get", findUser);

module.exports = router;
