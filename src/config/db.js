const { default: mongoose } = require("mongoose");
require("dotenv").config();
const mongoDBUriString = process.env.MONGODB_URI_STRING


const connectDB = async() => {
    try {
        await mongoose.connect(mongoDBUriString)
        console.log('State District Data Hub DB is connected')
    } catch(err) {
        console.log(err);
        
    }
}


module.exports = connectDB