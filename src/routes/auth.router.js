const { Router } = require("express");
const { StatusCodes } = require("http-status-codes");
const { login, register, logout } = require("../controllers/auth.controller");

const router = Router();

router.post("/login", login);
router.post("/register", register);
router.post("/logout", logout);
router.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render("not-found");
});

module.exports = router;
