const { Router } = require("express");
const { isAuthorized } = require("../middlewares/auth");
const {
  createTransaction,
  getTransaction,
  getTransactionsByMerchantId,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const router = Router();

router.post("/", isAuthorized, createTransaction);
router.route("/:id").get(getTransaction).delete(deleteTransaction);
router.get("/user/:user_id", getTransactionsByMerchantId);

module.exports = router;
