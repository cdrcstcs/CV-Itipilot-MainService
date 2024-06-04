import mongoose from "mongoose";
const MONGO_URL = 'mongodb://localhost:27017/mongo-golang';

export default function connectToDb() {
    mongoose.connect(MONGO_URL, () => {
        console.log('Connected to DB');
    });
}
