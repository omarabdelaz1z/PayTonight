const { Router } = require("express");
const {authCall} = require("../middlewares/auth");
const {
  createTransaction,
  getTransaction,
  getTransactionsByMerchantId,
  deleteTransaction,
} = require("../controllers/transaction.controller");

const router = Router();

// TODO: prepare routes
router.post('/',authCall,createTransaction);
router.route('/:id').get(getTransaction).delete(deleteTransaction);
router.get('/user/:user_id', getTransactionsByMerchantId);

// method-override is needed to use PUT and DELETE
// https://www.npmjs.com/package/method-override

module.exports = router;
