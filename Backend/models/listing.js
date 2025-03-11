const mongoose = require("mongoose");

const listingSchema = new mongoose.Schema({
  title: {
    type: String,
    require: true
  },
  discription: String,
  image: {
    type: String,
  },
  price: Number,
  location: String,
  country: String
});

let listing = mongoose.model("listing", listingSchema);
module.exports = listing;
