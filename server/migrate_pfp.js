import mongoose from 'mongoose';
import User from './models/user.model.js';
import dotenv from 'dotenv';

dotenv.config();

const migrate = async () => {
    try {
        const dbName = process.env.DB_NAME || "QueryTracker";
        await mongoose.connect(`${process.env.MONGODB_URI}/${dbName}`);
        console.log(`Connected to DB: ${dbName} for migration...`);
        
        const users = await User.find({});
        console.log(`Detected ${users.length} registered operators.`);
        
        for (const user of users) {
            // Updated to 'bottts' for techy look
            const newPic = `https://api.dicebear.com/9.x/bottts/svg?seed=${user.username.toLowerCase()}`;
            user.profilePic = newPic;
            await user.save();
            console.log(`Updated operator: ${user.username}`);
        }
        
        console.log("Migration complete! Systems updated to BOT-style IDs.");
        process.exit(0);
    } catch (error) {
        console.error("Migration failed:", error);
        process.exit(1);
    }
};

migrate();
