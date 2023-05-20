const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();

app.use(express.json());
app.use(cors());

mongoose.connect('mongodb+srv://navjyotbhele:Navjyot18!@cluster0.3chnttd.mongodb.net/travel-data?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => console.log("Connected to MongoDB")).catch(console.error);

// Models
const TravelDetailsSchemaExport = require('./models/travel-details');

app.post('/save-travel-data', async (req, res) => {
    console.log("request", req.body)
    console.log(req.body.data.name)
    const payload = req.body.data
    const createdTravelData = new TravelDetailsSchemaExport({
        name: payload.name.value,
        email: payload.email.value,
        destination: payload.destination.value,
        travelers_count: payload.number_of_travelers.value,
        budget_per_person: payload.budget.value,
    })
    const result = await createdTravelData.save();
    res.send({ statues: "success" })
})

app.get('/travel-details', async (req, res) => {
    const travelDetails = await TravelDetailsSchemaExport.find({})
    res.send({
        success: 200,
        message: "data fetched successfully",
        data: travelDetails
    })
});

app.listen(3001, () => {
    console.log("server listening")
});