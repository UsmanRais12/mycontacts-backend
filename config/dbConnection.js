const mongoose = require('mongoose');

const dbConnection = async () => {
    try {
        await mongoose.connect(process.env.CONNECTION_STRING);
        console.log('Database Connected:', mongoose.connection.host, mongoose.connection.name);
    } catch (err) {
        console.error('Error connecting to database:', err.message);
        process.exit(1);
    }
};

module.exports = { dbConnection };
