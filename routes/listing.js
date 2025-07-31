const express = require("express");
const router = express.Router();
const wrapAsync = require("../utils/wrapAsync.js");
const Listing = require("../models/listing.js");
const { isLoggedIn, isOwner, validateListing } = require("../middleware.js");
const listingController = require("../controllers/listings.js");
const multer = require('multer');
const { storage } = require("../cloudConfig.js");
const upload = multer({ storage });

/// Search Route
// router.get("/search", wrapAsync(async (req, res) => {
//     const { q } = req.query;
//     if (!q) {
//         req.flash("error", "Please enter a search query.");
//         return res.redirect("/listings");
//     }

//     const regex = new RegExp(escapeRegex(q), 'i'); // case-insensitive
//     const listings = await Listing.find({
//         $or: [
//             { title: regex },
//             { description: regex },
//             { location: regex },
//             { country: regex }
//         ]
//     });
 
//     res.render("listings/searchResults", { listings, query: q });
// }));
router.get("/search", wrapAsync(async (req, res) => {
    const { q } = req.query;
    if (!q) {
        req.flash("error", "Please enter a search query.");
        return res.redirect("/listings");
    }

    const regex = new RegExp(escapeRegex(q), 'i');
    const listings = await Listing.find({
        $or: [
            { title: regex },
            { description: regex },
            { location: regex },
            { country: regex }
        ]
    });

    if (listings.length === 1) {
        return res.redirect(`/listings/${listings[0]._id}`);
    }

    res.render("listings/searchResults", { listings, query: q });
}));


function escapeRegex(text) {
    return text.replace(/[-[\]{}()*+?.,\\^$|#\s]/g, "\\$&");
}

// Index Route
router.get("/", wrapAsync(listingController.index));

// New Route
router.get("/new", isLoggedIn, listingController.renderNewForm);

// Create Route
// router.post("/", isLoggedIn, validateListing, wrapAsync(listingController.createListing));
router.post(
  "/",
  isLoggedIn,
  upload.single("listing[image]"),  // ⬅️ this line is essential
  validateListing,
  wrapAsync(listingController.createListing)
);


// Show Route
router.get("/:id", wrapAsync(listingController.showListing));

// Edit Route
router.get("/:id/edit", isLoggedIn, isOwner, wrapAsync(listingController.renderEditForm));

// Update Route
router.put("/:id", isLoggedIn, isOwner, upload.single("image"),  validateListing, wrapAsync(listingController.updateListing));

// Delete Route
router.delete("/:id", isLoggedIn, isOwner, wrapAsync(listingController.destroyListing));

module.exports = router;


// Autocomplete
// GET /listings/search/suggestions?q=letter
router.get('/search/suggestions', async (req, res) => {
    const { q } = req.query;
    try {
        const listings = await Listing.find({
            title: { $regex: q, $options: 'i' }
        }).select('title _id').limit(10); // only needed fields

        res.json(listings);
    } catch (err) {
        res.status(500).json({ error: "Search failed" });
    }
});
