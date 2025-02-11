import mongoose from 'mongoose';
import dotevn from 'dotenv';

dotevn.config();

const connectDB = async() => {
    try{
        const connectionINstance = await mongoose.connect(`${process.env.MONGODB_URI}/${process.env.DB_NAME}`);
        // console.log(`MongoDB connected !! Db host: ${connectionInstance.connection.host}`);
    }
    catch(error)
    {
        console.log("MongoDB connection error ", error);
        process.exit(1);  
    }
}

export default connectDB;