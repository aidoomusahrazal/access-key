const mongoose = require('mongoose');
const express = require('express');
const schedule = require('node-schedule')
const axios = require('axios')
const cors = require('cors')
require('dotenv').config()

const app = express();

app.use(cors())

app.use(express.json());

async function connectToDatabase() {
    try {
        await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Connected to Database");
    } catch (error) {
        console.error("Error connecting to database:", error);
    }
}

connectToDatabase(); // Call the async function to connect to the database

const userRoute = require('./routes/userRoutes');
app.use("/api", userRoute);

const accessKeyRoutes = require('./routes/accessKeyRoutes');
app.use("/api", accessKeyRoutes)

const adminRoutes = require('./routes/adminRoutes');
app.use("/api", adminRoutes)


// Scheduler to update keyStatus to 'expired' every 24 hours
schedule.scheduleJob( new Date(Date.now() +'24 * 60 * 60 * 1000'), async () => {
    try {
         const response = await axios.get("http://localhost:4000/api/check-key-expiry"  )
    } catch (error) {
       console.log(error.message)
    }
  });


app.listen(4000, () => {
    console.log("Server running on port 4000");
});
