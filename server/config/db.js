const mongoose = require('mongoose')
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '..', '.env') })

const uri = process.env.MONGO_URL

const connectDB = async () => {
    if (!uri) {
        console.error('MONGO_URL not set. Add it to server/.env as MONGO_URL=<connection_string>')
        process.exit(1)
    }
    try {
        await mongoose.connect(uri)
        console.log('MongoDB connected successfully')
    } catch (error) {
        console.error('MongoDB connection failed', error)
        throw error
    }
}

module.exports = connectDB