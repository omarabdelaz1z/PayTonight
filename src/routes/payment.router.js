const { Router } = require("express");
const { isAuthorized } = require("../middlewares/auth");
const {
  validateJwt,
  validateCheckout,
  validatePayment,
} = require("../middlewares/payment");

const {
  checkout,
  pay,
  paymentIframe,
} = require("../controllers/payment.controller");

const router = Router();

router.post("/checkout", isAuthorized, validateCheckout, checkout);
router.get("/iframe", validateJwt, paymentIframe);
router.post("/pay", validateJwt, validatePayment, pay);

module.exports = router;
