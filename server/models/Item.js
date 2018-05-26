
const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const itemSchema = new Schema({
    name: String,
    description: String,
    quantity: Number
});

module.exports = mongoose.model("Item", itemSchema);
