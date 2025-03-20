const { default: mongoose } = require("mongoose");


const districtSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    population: {
        type: Number,
        required: true
    },
    state_id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: "State",
        required: true }
})

const District = mongoose.model('District', districtSchema)

module.exports = District