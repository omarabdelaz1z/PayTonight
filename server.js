const path = require("path");
const express = require("express");
const { StatusCodes } = require("http-status-codes");

const middleware = require("./src/utils/middleware");
const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.router");
const paymentRouter = require("./src/routes/payment.router");

const { loginRequired, isAlreadyLoggedIn } = require("./src/middlewares/auth");

const { formatError } = require("./src/utils/general");
const { showDashboard } = require("./src/controllers/user.controller");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

middleware(app);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/api/payment/", paymentRouter);

app.get("/", isAlreadyLoggedIn, (req, res) => {
  res.render("index.ejs", {
    signinError: formatError(req.flash("signin-error")),
    signupError: formatError(req.flash("signup-error")),
  });
});

app.get("/dashboard", loginRequired, showDashboard);

app.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render("not-found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT}`);
});
