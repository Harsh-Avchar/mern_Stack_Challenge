
const mongoose = require('mongoose');

const productTransactionSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, required: true },
  price: { type: Number, required: true },
  category: { type: String, required: true },
  dateOfSale: { type: Date, required: true },
  image: { type: String, required: true },
  sold: { type: Boolean, required: true },
});

module.exports = mongoose.model('ProductTransaction', productTransactionSchema);
