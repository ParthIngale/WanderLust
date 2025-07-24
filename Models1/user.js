const mongoose = require('mongoose');
const { Schema } = mongoose;

main()
    .then(() => console.log("Connection Successful"))
    .catch((err) => console.log(err));

async function main() {
  await mongoose.connect('mongodb://127.0.0.1:27017/relationDemo');

}

const userSchema = new Schema({
    username: String,
    address: [
        {
            location: String,
            city: String,
        },
    ],
});

const User = mongoose.model("User", userSchema);

const addUsers = async () => {
    let user1 = new User({
        username: "SherlockHolmes",
        address: [{
            location: "221B Baker Street",
            city: "London"
        }]
    });

    user1.address.push({ location: "P32 WallStreet", city: "London" });
    let result = await user1.save();
    console.log(result);
}

addUsers();