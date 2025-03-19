import mongoose from "mongoose";

const connect = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI);

        console.log(`Connected to MongoDB ${mongoose.connection.name}`);
    } catch (error) {
        console.log('Connection failed!!!' ,error);
    }
};

export default {connect};