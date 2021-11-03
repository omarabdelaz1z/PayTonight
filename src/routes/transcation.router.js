const { Router } = require("express");
const { loginRequired } = require("../middlewares/auth");
const {
  getTransaction,
  getUserTransactions,
} = require("../controllers/transaction.controller");

const router = Router();
router.use(loginRequired);

router.get("/", getUserTransactions);
router.get("/:id").get(getTransaction);

module.exports = router;
