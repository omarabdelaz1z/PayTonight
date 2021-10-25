const express = require("express");
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
const app = express();
const path = require('path');
const mongoose = require("mongoose");
const bodyParser = require("body-parser");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

app.use(bodyParser.urlencoded({extended: true}));

app.use(express.static(path.join(__dirname, 'public')));

/*var url = "mongodb://localhost:27017/";
var mongodb_1 = require("mongodb");
mongodb_1.MongoClient.connect(url, function (err, db) {
    if (err)
        throw err;
    if (db) {
        var dbo = db.db("mydb");
        dbo.createCollection("User", function (err, res) {
            if (err)
                throw err;
            console.log("Collection created!");
            db.close();
        });
    }
});
*/
mongoose.connect('mongodb://localhost:27017/mydb');
const options = {
    toJSON: {
      virtuals: true,
    },
  };
const userSchema = new mongoose.Schema(
    {
      username: {
        type: String,
        required: [true, "Name is required"],
      },
  
      password: {
        type: String,
        required: [true, "Password is required"],
      },
  
      email: {
        type: String,
        required: [true, "Email is required"],
      },
  
      organization: {
        type: String,
        required: [true, "organization is required"],
      },

      bankAccount: {
        type: String,
        required: [true, "Bank Account is required"],
      },
      apps: [
        {
          name: String,
          iv: String,
          timestamp: String,
          passphrase: String,
        },
      ],
    },
    options
  );



  const User = mongoose.model("MyUser", userSchema);


app.get("/", function(req, res){
    res.sendFile(__dirname + "/index.html")
})


app.post("/", function(req, res){

let NewUser = new User({
    username: req.body.username,
    password: req.body.password,
    email: req.body.email,
    organization: req.body.organization,
    bankAccount: req.body.bankaccount

});
NewUser.save();
res.redirect("/");
})

app.get("/", function(req, res){

  MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("myusers").findOne({email: req.body.loginemailAddress, password: req.body.loginpassword}, function(err, result) {
      if (err) throw err;
      else if (result?.username != null)

      {console.log(result?.username);
      //redirect("dashboard");
    }
    else 
    console.log("not found");
      db.close();
    });
  });
  //res.redirect("./dashboard.html");
  })

/*  
var EMAILvalue = document.getElementById("loginemailAddress").innerHTML;
var PASSWORDvalue = document.getElementById("loginpassword").innerHTML;*/
 MongoClient.connect(url, function(err, db) {
    if (err) throw err;
    var dbo = db.db("mydb");
    dbo.collection("myusers").findOne({email: "xyz@hotmail.com", password: "xyz"}, function(err, result) {
      if (err) throw err;
      else if (result?.username != null)

      {console.log(result?.username);
      //redirect("dashboard.html");
    }
    else 
    console.log("not found");
      db.close();
    });
  });



/*const register = (req, res, next) =>{
bcrypt.hash(req.body.password, 10, function(err, hashedPass){
if (err){
res.json(
{error:err})
}
})
let NewUser = new User({
  username: req.body.username,
  password: hashedPass,
  email: req.body.email,
  organization: req.body.organization,
  bankAccount: req.body.bankaccount

})
NewUser.save()
.then(NewUser => {
res.json(
{
message: "User Added Successfully!"
})
}).catch(error => {
  res.json(
    {
    message: "An Error Occured!"
    })
})
}
*/
app.listen(3000, function(){
    console.log("server is running on 3000");
});