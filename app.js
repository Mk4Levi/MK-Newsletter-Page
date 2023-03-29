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
  name: String,
};

// creating mongoose Model
const Item = mongoose.model("Item", itemsSchema);

// app.get()
app.get("/", function (req, res) {
  Item.find()
    .then(function (foundItems) {
      console.log(foundItems);

      if (foundItems.length === 0) {
        Item.insertMany()
          .then(function () {
            console.log("Successfully saved default items to DB.");
          })
          .catch(function (err) {
            console.log("Error found in saving default items to DB: " + err);
          });
        res.redirect("/");
      } else {
        res.sendFile(__dirname + "/signup.html");
      }
    })
    .catch(function (err) {
      console.log(err);
    });
});

app.post("/", function (req, res) {
  const firstName = req.body.fName;
  const lastName = req.body.lName;
  const email = req.body.email;

  const item1 = new Item({
    name: firstName,
  });

  const item2 = new Item({
    name: lastName,
  });

  const item3 = new Item({
    name: email,
  });

  item1.save();
  item2.save();
  item3.save();

  res.redirect("/");
});

app.listen(port, function () {
  console.log("Server is running on port : " + port);
});
