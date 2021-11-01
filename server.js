require("dotenv").config();
const express = require("express");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const middleware = require("./src/utils/middleware");
const authRouter = require("./src/routes/auth.router");
const userRouter = require("./src/routes/user.router");
const transactionsRouter = require("./src/routes/transcation.router");
const {
  loginRequired,
  isAlreadyLoggedIn,
  isAuthorized,
} = require("./src/middlewares/auth");
const { showDashboard } = require("./src/controllers/user.controller");
const { formatError } = require("./src/utils/general");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

middleware(app);

app.use("/auth", authRouter);
app.use("/user", userRouter);
app.use("/transactions", transactionsRouter);

app.get("/", isAlreadyLoggedIn, (req, res) => {
  res.render("index.ejs", {
    signinError: formatError(req.flash("signin-error")),
    signupError: formatError(req.flash("signup-error")),
  });
});

app.post("/hello", isAuthorized, (req, res) => {
  res.json({ username: "A" });
});

app.get("/dashboard", loginRequired, showDashboard);

app.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render("not-found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT}`);
});
