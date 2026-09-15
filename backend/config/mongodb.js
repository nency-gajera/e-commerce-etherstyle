import mongoose from 'mongoose';

let isConnected = false;

const connectDB = async () => {
    try {
        mongoose.connection.on('connected', () => {
            isConnected = true;
            console.log("DB Connected Successfully");
        });
        
        mongoose.connection.on('error', (err) => {
            isConnected = false;
            console.log("DB Connection Error (using in-memory fallback):", err.message);
        });

        await mongoose.connect(`${process.env.MONGODB_URI}`, {
            serverSelectionTimeoutMS: 2000
        });
    } catch (error) {
        isConnected = false;
        console.log("MongoDB Connection failed:", error.message);
    }
}

export { isConnected };
export default connectDB;
