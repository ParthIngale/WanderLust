const mongoose = require("mongoose");
const Schema = mongoose.Schema;
const review = require("./review.js");

const listingSchema = new Schema({
  title: {
    type: String,
    required: true,
  },
  description: String,
  image: {
    filename: {
      type: String,
      default: "listingimage",
    },
    url: {
      type: String,
      default: "https://unsplash.com/photos/a-person-walks-before-a-mountain-under-stars-NQvzoW-e1UA",
      set: (v) =>
        v === ""
          ? "https://unsplash.com/photos/a-person-walks-before-a-mountain-under-stars-NQvzoW-e1UA"
          : v,
    },
  },
  price: String,
  location: String,
  country: String,
  reviews: [
    {
      type: Schema.Types.ObjectId,
      ref: "Review",
    },
  ],
  owner: {
    type: Schema.Types.ObjectId,
    ref: "User"
  },

  categeory: {
    type: String,
    enum: ["mountains"]

  }

  
    
  
});


listingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});


const Listing = mongoose.model("Listing", listingSchema);
module.exports = Listing;
