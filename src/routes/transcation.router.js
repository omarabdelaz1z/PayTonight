const { Router } = require("express");
const {
  createTransaction,
  deleteTransactionById,
  updateTransactionById,
  getTransactionById,
} = require("../controllers/transaction.controller");

const router = Router();

// TODO: prepare routes
router
  .route("/:id")
  .get(getTransactionById)
  .put(updateTransactionById)
  .delete(deleteTransactionById);

// method-override is needed to use PUT and DELETE
// https://www.npmjs.com/package/method-override

router.post("/", createTransaction);

module.exports = router;
