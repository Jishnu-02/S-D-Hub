const { default: mongoose } = require("mongoose");


const stateSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        unique: true
    },
    population: {
        type: Number,
        required: true
    },
    area: {
        type: String,
        required: true
    },
})

const State = mongoose.model('State', stateSchema)

module.exports = State