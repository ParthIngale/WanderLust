const mongoose = require("mongoose");
const Listing = require("./models/listing");

mongoose.connect("mongodb://127.0.0.1:27017/wanderlust")
  .then(() => console.log("MongoDB Connected"))
  .catch((err) => console.log(err));

const categories = [
  "nature", "city", "mountains", "beach", "house", "hotel", "forest", "travel", "lake", "desert"
];

function getRandomImageURL() {
  const category = categories[Math.floor(Math.random() * categories.length)];
  return `https://source.unsplash.com/600x400/?${category}`;
}

const sampleListing = new Listing({
    title: 'Cozy Cabin',
    price: 2500,
    description: 'A quiet, cozy cabin in the hills',
    location: 'Kasauli',
    country: 'India',
    image: 'https://source.unsplash.com/random/800x600?cabin' // <== IMAGE URL from Unsplash
});

async function seedDB() {
  await Listing.deleteMany({});

  for (let i = 0; i < 20; i++) {
    const listing = new Listing({
      title: `Listing ${i + 1}`,
      description: "Beautiful property with great views.",
      price: Math.floor(Math.random() * 5000) + 1000,
      location: `City ${i + 1}`,
      country: "India",
      image: getRandomImageURL(), // ✅ setting internet image
    });
    await listing.save();
  }

  console.log("Database Seeded");
  mongoose.connection.close();
}

seedDB();
