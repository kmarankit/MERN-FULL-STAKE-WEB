import mongoose from "mongoose";

export const connectDB = async () => {
    try {
        // We use a variable for the URI to keep server.js clean
        const conn = await mongoose.connect(process.env.MONGO_URI || 'mongodb+srv://ak373714:admin@annpurnadhaba.glrorlw.mongodb.net/annpurna_db');
        
        console.log(`✅ MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(`❌ Error: ${error.message}`);
        process.exit(1); // Stop the server if DB fails
    }
};