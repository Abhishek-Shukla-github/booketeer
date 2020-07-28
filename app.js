let express = require("express");
let app = express();
let bodyParser = require("body-parser");
let mongoose = require("mongoose");
app.set("view engine", "ejs");
const jsdom = require("jsdom");
const { JSDOM } = jsdom;

app.use(express.static("public"));
app.use(bodyParser.urlencoded({ extended: true }));
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

//Registering new user
//Signup form
app.get("/register", (req, res) => {
  res.render("register");
});

//Sign up logic
app.post("/register", (req, res) => {
  User.create(req.body.user, function (err, createdUser) {
    if (err) console.log("ERROR:- " + err);
    else {
      console.log(createdUser);
      res.redirect("/");
    }
  });
});

//Loggin in an existing user
//Displaying the login form
app.get("/login", (req, res) => {
  res.render("login");
});

app.listen(3000, (req, res) => {
  console.log("Booketeer running on port 3000!");
});
