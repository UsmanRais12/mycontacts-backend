const express = require("express");
const errorHandler = require('./middleware/errorHandler');
const { dbConnection } = require("./config/dbConnection");
const dotenv = require("dotenv").config();
const app = express()
const port = process.env.PORT||5000;

dbConnection();
app.use(express.json());

app.use("/api/contacts",require('../mycontacts-backend/routes/contactRoutes'))
app.use("/api/users",require('../mycontacts-backend/routes/userRoutes'))

app.use(errorHandler)
app.listen(port, ()=>{
    console.log(`Server runnig on port ${port}`)
})