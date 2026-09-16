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
            console.log("DB Connection Error:", err.message);
        });

        const mongoUri = process.env.MONGODB_URI || 'mongodb://127.0.0.1:27017/etherstyle';
        await mongoose.connect(mongoUri, {
            serverSelectionTimeoutMS: 5000
        });
    } catch (error) {
        isConnected = false;
        console.log("MongoDB Connection failed:", error.message);
    }
}

export { isConnected };
export default connectDB;
