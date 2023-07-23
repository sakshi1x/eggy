require('./config/setup')

const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const cors = require('cors');
const fs = require('fs');
const Data = require('./models/Data');
const morgan = require('morgan');
const Trigger = require('./models/Trigger');
app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
    extended: false,
}));



app.get('/api/get-relay', async (req, res) => {

    try {

        const previous = await Trigger.findOne();
        console.log(previous)
        res.status(201).json(previous);
    } catch (e) {
        res.status(500).json({
            msg: e,
        });
    }
})


app.post('/api/set-relay', async (req, res) => {
    try {
        console.log(req.body)
        const { relay1, relay2, relay3, relay4 } = req.body;
        const previous = await Trigger.findOne();
        previous.relay1 = relay1;
        previous.relay2 = relay2;
        previous.relay3 = relay3;
        previous.relay4 = relay4;
        await previous.save();
        res.status(201).json(previous);
    } catch (e) {
        res.status(500).json({
            msg: e,
        });
    }
})


app.get('/api/sensor-data', async (req, res) => {

    try {
        const savedData = await Data.findOne({}).sort({ createdAt: -1 });
        res.status(201).json({
            success: true,
            data: savedData,
        });
    } catch (e) {
        res.status(500).json({
            msg: e,
        });
    }
})

app.get('/api/data/:humidity/:temperature', async (req, res) => {

    try {
        const newData = new Data({
            temp: req.params.temperature,
            hum: req.params.humidity
        });
        const savedData = await newData.save();
        res.status(201).json({
            success: true,
            data: savedData,
        });
    } catch (e) {
        res.status(500).json({
            msg: e,
        });
    }
})


const createRelay = async () => {
    try {
        const previous = await Trigger.findOne();
        console.log(previous)
        if (previous == undefined) {
            const newData = new Trigger({});
            await newData.save();
        }
    } catch (e) {
        res.status(500).json({
            msg: e,
        });
    }
}
createRelay()
app.listen(process.env.PORT || 5000, () => {
    console.log("Server is running on port 5000")
})