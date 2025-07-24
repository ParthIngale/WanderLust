const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const cookieParser = require("cooki")

app.get("/getcookies", (req, res) => {
    res.cookie("greet", "hello");
    res.send("sent you some cookies");

})

app.get("/", (req, res) => {
    res.send("Hi I am root");
});

app.use("/users", users);
app.use("/posts", posts);

app.listen(3000, () => {
    console.log("Server is listening to 3000");
})