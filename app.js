//
// requiring modules for this app
const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");

const app = express();
const port = process.env.PORT || 3000;

// app.set()
app.set("view engine", "ejs");

// app.use()
app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));

// connecting 'mongoose' with 'mongodb' database
mongoose.connect(
  "mongodb+srv://Manthan6296:Mkp-6296@cluster0.yysjuox.mongodb.net/MK-Signup-Page-DB",
  { useNewUrlParser: true }
);

// creating mongoose Schema
const itemsSchema = {
  fname: String,
  lname: String,
  email: String,
};

// creating mongoose Model
const Usercollection = mongoose.model("Usercollection", itemsSchema);

// app.get()
app.get("/", function (req, res) {
  Usercollection.find()
    .then(function (foundItems) {
      console.log(foundItems);

      if (foundItems.length === 0) {
        Usercollection.insertMany()
          .then(function () {
            console.log("Successfully saved default items to DB.");
          })
          .catch(function (err) {
            console.log("Error found in saving default items to DB: " + err);
          });
        // res.redirect("/");
      } else {
        res.sendFile(__dirname + "/signup.html");
      }
    })
    .catch(function (err) {
      console.log(err);
      res.sendFile(__dirname + "/failure.html");
    });
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const userDetails = new Usercollection({
    fname: firstName,
    lname: lastName,
    email: email
  });

  userDetails.save();

  res.redirect("/");
});

app.post("/success", function (req, res) {
  res.redirect("/");
});

app.post("/failure", function (req, res) {
  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server is running on port : " + port);
});
