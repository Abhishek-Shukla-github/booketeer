let express = require("express");
let app = express();
let mongoose = require("mongoose");
app.set("view engine", "ejs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(express.static("public"));
//Mongoose modelling
mongoose.connect("mongodb://localhost:27017/booketeer", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

let userSchema = new mongoose.Schema({
  username: String,
  age: Number,
  password: String,
});

let User = mongoose.model("User", userSchema);

//Rest Routes
app.get("/", (req, res) => {
  res.render("landing");
});

app.get("/book", (req, res) => {
  res.render("book");
});

//Signup form
app.get("/register", (req, res) => {
  res.send("Sign up form!");
});

app.listen(3000, (req, res) => {
  console.log("Booketeer running on port 3000!");
});
