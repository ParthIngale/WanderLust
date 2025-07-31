if (process.env.NODE_ENV != "production") {
require("dotenv").config();
console.log("Loaded SECRET:", process.env.SECRET);
}

console.log(process.env);
const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");
const session = require("express-session");
const MongoStore = require("connect-mongo");
const flash = require("connect-flash");
const passport = require("passport");
const LocalStrategy = require("passport-local");
const User = require("./models/user.js");    
const userRouter = require("./routes/user.js"); 
const listingRouter = require("./routes/listing.js"); 
const reviewRouter = require("./routes/review.js");


//How to createa a database
//Take URL from site
//define the async function

// const Mongo_Url = "mongodb://127.0.0.1:27017/WanderLust";
const dbUrl = process.env.ATLASDB_URL;
app.use((req, res, next) => {
  res.locals.currentPath = req.path;
  next();
});

app.use(express.static("public"));
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));
// app.use('/uploads', express.static('/uploads'));
app.use('/uploads', express.static('uploads'));



main()
    .then(() => {
    console.log("Connected to DB");
})
    .catch((err) => {
        console.log(err);
    });

async function main(){
    // await mongoose.connect(Mongo_Url);
    await mongoose.connect(dbUrl);

}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "public")));

const store = MongoStore.create({
  mongoUrl: dbUrl,
  crypto: {
  secret: process.env.SECRET,
  },
  touchAfter: 24*3600
});
 
store.on("error", () => {
  console.log("ERROR IS IN MONGO SESSION STORE", err);
});

const sessionOptions = {
    store,
    secret: process.env.SECRET,
    resave: false,
    saveUninitialized: true,
    cookie: {
        expires: Date.now() + 7 * 24 * 60 * 60 * 1000,
        maxAge: 7 * 24 * 60 * 60 * 1000,
        httpOnly: true,
    },
};


app.use(session(sessionOptions));
app.use(flash());

app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));

passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


app.use((req, res, next) => {
     res.locals.currUser = req.user;

  res.locals.success = req.flash("success");
    res.locals.error = req.flash("error");
  next();
});

app.use("/listings",listingRouter);
app.use("/listings/:id/reviews", reviewRouter);
app.use("/", userRouter);



app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Oops! Something went wrong" } = err;
  res.render("listings/error.ejs", { message });
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
