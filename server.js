require("dotenv").config();

const express = require("express");
const path = require("path");
const { StatusCodes } = require("http-status-codes");
const middleware = require("./src/utils/middleware");
const authRouter = require("./src/routes/auth.router");
const devRouter = require("./src/routes/dev.router");
const transactionsRouter = require("./src/routes/transcation.router");
const { loginRequired, isAlreadyLoggedIn } = require("./src/middlewares/auth");

const app = express();
app.use(express.static(path.join(__dirname, "public")));
app.set("view engine", "ejs");

middleware(app);

app.use("/auth", authRouter);
app.use("/dev", devRouter);
app.use("/transactions", transactionsRouter);

app.get("/", isAlreadyLoggedIn, (req, res) => res.render("index.ejs"));
app.get("/dashboard", loginRequired, (req, res) => res.render("dashboard"));

app.get("*", (req, res) => {
  res.status(StatusCodes.NOT_FOUND).render("not-found");
});

app.listen(process.env.PORT, () => {
  console.log(`Server Listening on Port ${process.env.PORT}`);
});
