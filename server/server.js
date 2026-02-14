const express = require('express');
const app = express()
const path = require('path')
require('dotenv').config({ path: path.resolve(__dirname, '.env') })
app.use(express.json())
const port = process.env.PORT || 5000
const connectDb = require('./config/db')
const studentRoutes = require('./routes/studentRoutes')
const cors = require('cors')
app.use(cors())

app.use('/api', studentRoutes)

app.use('/', (_, res) => {
    res.send('hello from express')
})

const start = async () => {
    try {
        await connectDb()
        app.listen(port, () => {
            console.log(`Server is running on http://localhost:${port}`)
        })
    } catch (err) {
        console.error('Failed to start server:', err)
        process.exit(1)
    }
}

start()

