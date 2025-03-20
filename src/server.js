const express = require('express')
const connectDB = require('./config/db')
require('dotenv').config()
const app = express()
const {statesRouter} = require('./routes/stateRoutes')
const {districtRouter} = require('./routes/districtRoutes')
const port = process.env.PORT

app.use(express.json())

connectDB()

app.use('/api/states', statesRouter)
app.use('/api/districts', districtRouter)

app.listen(port, () => {
    console.log(`server running on ${port}`);
    
})