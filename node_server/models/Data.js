const mongoose = require('mongoose');

const dataSchema = new mongoose.Schema({
    temp: { type: String, required: true },
    hum: { type: String, require: true },
},
    { timestamps: true })
module.exports = mongoose.model("Data", dataSchema);