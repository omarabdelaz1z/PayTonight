require("dotenv").config();
<<<<<<< Updated upstream
=======
const express = require("express");
const fetch = require("node-fetch");
>>>>>>> Stashed changes
const path = require("path");
const express = require("express");
const { StatusCodes } = require("http-status-codes");

const middleware = require("./src/utils/middleware");
const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.router");
const paymentRouter = require("./src/routes/payment.router");
const transactionsRouter = require("./src/routes/transcation.router");

const { loginRequired, isAlreadyLoggedIn } = require("./src/middlewares/auth");

const { formatError } = require("./src/utils/general");
const { showDashboard } = require("./src/controllers/user.controller");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

middleware(app);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);
app.use("/api/payment/", paymentRouter);

<<<<<<< Updated upstream
app.get("/", isAlreadyLoggedIn, (req, res) => {
  res.render("index.ejs", {
    signinError: formatError(req.flash("signin-error")),
    signupError: formatError(req.flash("signup-error")),
=======
app.get("/", isAlreadyLoggedIn, (req, res) => res.render("index.ejs"));
app.get("/dashboard", loginRequired, async (req, res) => {
  // eslint-disable-next-line no-underscore-dangle
  const id = req.user._id.valueOf();
  const response = await fetch(
    `http://localhost:${process.env.PORT}/transactions/user/${id}`
  );
  const data = await response.json();
  res.render("dashboard", {
    apiKey: req.user.apikey,
    transactions: data.transactions,
    userid: id,
>>>>>>> Stashed changes
  });
});

app.get("/dashboard", loginRequired, showDashboard);

app.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render("not-found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT}`);
});
