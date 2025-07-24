const express = require("express");
const app = express();
const mongoose = require("mongoose");
const Listing = require("./models/listing.js");
const listings = require("./routes/listing.js"); // ✅ <-- ADD THIS LINE
const path = require("path");
const methodOverride = require("method-override");
const ejsMate = require("ejs-mate");
const wrapAsync = require("./utils/wrapAsync.js");
const ExpressError = require("./utils/ExpressError.js");

const reviews = require("./routes/review.js");


//How to createa a database
//Take URL from site
//define the async function
const Mongo_Url = "mongodb://127.0.0.1:27017/WanderLust";
app.use(express.static("public"));

main()
    .then(() => {
    console.log("Connected to DB");
})
    .catch((err) => {
        console.log(err);
    });

async function main(){
    await mongoose.connect(Mongo_Url);
}

app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));
app.use(express.urlencoded({ extended: true }));
app.use(methodOverride("_method"));
app.engine('ejs', ejsMate);
app.use(express.static(path.join(__dirname, "/public")));
app.use(express.static(path.join(__dirname, "public")));





app.get("/", (req, res) => {
    res.send("Hi, I am root");
});
  
app.use("/listings",listings);
app.use("/listings/:id/reviews",reviews); 



app.use((err, req, res, next) => {
  let { statusCode = 500, message = "Oops! Something went wrong" } = err;
  res.render("listings/error.ejs", { message });
});

app.listen(8080, () => {
    console.log("server is listening to port 8080");
});
