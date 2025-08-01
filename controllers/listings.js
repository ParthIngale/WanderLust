const Listing = require("../models/listing");

module.exports.index = async (req, res) => {
    const allListings = await Listing.find({});
    res.render("listings/index.ejs", { allListings });
};

module.exports.renderNewForm = (req, res) => {
  
    res.render("listings/new.ejs");
  
};

module.exports.showListing = async (req, res) => {
    let { id } = req.params;
    const listing = await Listing.findById(id)
        .populate({
            path: "reviews",
            populate: {
                path: "author"
            }
        })
        .populate("owner");
    if (!listing) {
        req.flash("error", "Listing you requested does not exist");
        res.redirect("/listings");
    }
    console.log(listing);
    res.render("listings/show.ejs", { listing });
};
  
module.exports.createListing = async (req, res, next) => {
    const newListing = new Listing(req.body.listing);
    newListing.owner = req.user._id;

    // Save uploaded image
    if (req.file) {
        // ✅ Use Cloudinary URL
newListing.image = {
  url: req.file.path,
  filename: req.file.filename
};

    }

    await newListing.save();
    req.flash("success", "New Location added!");
    res.redirect(`/listings/${newListing._id}`);
};

module.exports.editListing = async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      res.redirect("/listings");
}
      res.render("listings/edit.ejs", { listing });
    }
  
 
module.exports.renderEditForm = async (req, res) => {
      let { id } = req.params;
      const listing = await Listing.findById(id);
      if (!listing) {
      req.flash("error", "Listing you requested does not exist");
      res.redirect("/listings");
    }
    let originalImageUrl = listing.image.url;
    originalImageUrl = originalImageUrl.replace("/upload" , "/upload/h_300,w_250")
      res.render("listings/edit.ejs", { listing , originalImageUrl });
    }

module.exports.updateListing = async (req, res) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndUpdate(id, { ...req.body.listing });

  // ✅ Handle new image if uploaded
  if (req.file) {
    listing.image = {
      url: req.file.path,
      filename: req.file.filename
    };
  }

  await listing.save();
  req.flash("success", "Listing Updated Successfully!");
  res.redirect(`/listings/${listing._id}`);
};

    
module.exports.destroyListing = async (req, res) => {
        let { id } = req.params;
        let deletedListing = await Listing.findByIdAndDelete(id);
        console.log(deletedListing);
        req.flash("success", "Listing Deleted");
        res.redirect("/listings");
      }