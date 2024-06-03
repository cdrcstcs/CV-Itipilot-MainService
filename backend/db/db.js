const mongoose = require("mongoose");
const MONGO_URL = 'mongodb://localhost:27017/mongo-golang';

module.exports = function connectToDb() {
    mongoose.connect(MONGO_URL, () => {
        console.log('Connected to DB');
    });
}
