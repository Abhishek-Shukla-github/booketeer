let express = require("express");
let app = express();
let bodyParser = require("body-parser");

let mongoose = require("mongoose"),
  passport = require("passport"),
  LocalStrategy = require("passport-local"),
  passportLocalMongoose = require("passport-local-mongoose");

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

userSchema.plugin(passportLocalMongoose);
let User = mongoose.model("User", userSchema);

//Passport Setup
app.use(
  require("express-session")({
    secret: "Booketeer",
    resave: false,
    saveUninitialized: false,
  })
);

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
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
  let newUser = new User({ username: req.body.username, age: req.body.age });
  User.register(newUser, req.body.password, function (err, user) {
    if (err) {
      console.log("ERROR:- " + err);
      res.redirect("/register");
    } else {
      passport.authenticate("local")(req, res, function () {
        res.redirect("/book");
      });
    }
  });
});

//Logging in an existing user
//Displaying the login form
app.get("/login", (req, res) => {
  res.render("login");
});

//Login Logic
app.post(
  "/login",
  passport.authenticate("local", {
    successRedirect: "/book",
    failureRedirect: "/",
  }),
  (req, res) => {}
);

app.listen(3000, (req, res) => {
  console.log("Booketeer running on port 3000!");
});
