const { mongo } = require("mongoose");

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
        await mingoose.connect("mongodb://127mongodb://127.0.0.1:27017/relationDemo")
    }