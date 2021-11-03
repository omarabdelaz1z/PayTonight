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
  success,
  failure,
} = require("../controllers/payment.controller");
const { requireJsonContent } = require("../middlewares/general");

const router = Router();

router.post(
  "/checkout",
  requireJsonContent,
  isAuthorized,
  validateCheckout,
  checkout
);
router.post("/pay", validateJwt, validatePayment, pay);
router.get("/iframe", validateJwt, paymentIframe);
router.get("/pay/success", success);
router.get("/pay/fail", failure);

module.exports = router;
