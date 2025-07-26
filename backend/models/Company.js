const mongoose = require("mongoose");

const CompanySchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  name: String,
  address: String,
  gstin: String,
  pan: String,
  contactName: String,
  phone: String,
  email: String,
  logoUrl: String,
});

module.exports = mongoose.model("Company", CompanySchema);
