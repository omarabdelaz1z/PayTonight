require("dotenv").config();
const express = require("express");
const middleware = require("./src/utils/middleware");

const app = express();

middleware(app);

// mount routes here
// note: resource name is plural
// app.use("/resource", resourceRouter)

app.get("/", (req, res) => res.render("index.html"));

app.get("/login", (req, res) => res.render("login"));

app.get("/register", (req, res) => res.render("register"));

app.get("/about", (req, res) => res.render("about"));

app.listen(process.env.PORT, () => {
  console.log(`http://localhost:${process.env.PORT}`);
});
