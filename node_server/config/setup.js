const mongoose = require('mongoose');
mongoose.connect("mongodb://127.0.0.1/cloud_data", {
    useNewUrlParser: true,
    useUnifiedTopology: true
})

