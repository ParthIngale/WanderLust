const express = require("express");
const app = express();
const users = require("./routes/users.js");
const posts = require("./routes/posts.js");
const session = require("express-session");

app.use(session({ secret: "mysupersecretstring" }));

app.get("/test", (req, res) => {
    res.send("Tests Successful");
});


app.listen(3000, () => {
    console.log("Server is listening to 3000");
})