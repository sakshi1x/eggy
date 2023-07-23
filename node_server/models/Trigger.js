const mongoose = require('mongoose');

const triggerSchema = new mongoose.Schema({
    relay1: { type: Boolean, required: true, default: true },
    relay2: { type: Boolean, require: true, default: true },
    relay3: { type: Boolean, require: true, default: true },
    relay4: { type: Boolean, require: true, default: true },
},
    { timestamps: true })
module.exports = mongoose.model("Relay", triggerSchema);