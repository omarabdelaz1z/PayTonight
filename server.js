require("dotenv").config();

const express = require("express");
const middleware = require("./src/utils/middleware");
const authRouter = require("./src/routes/auth.router");
const devRouter = require("./src/routes/dev.router");
const { loginRequired, isAlreadyLoggedIn } = require("./src/middlewares/auth");

const app = express();

app.set("view engine", "ejs");

middleware(app);

app.use("/auth", authRouter);
app.use("/dev", devRouter);

app.get("/", (req, res) => res.render("index.ejs"));

app.get("/login", isAlreadyLoggedIn, (req, res) => res.render("login"));

app.get("/register", isAlreadyLoggedIn, (req, res) => res.render("register"));

app.get("/about", (req, res) => res.render("about"));

app.get("/dashboard", loginRequired, (req, res) => res.render("dashboard"));

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}/login`);
});
