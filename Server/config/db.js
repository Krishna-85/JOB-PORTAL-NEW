import mongoose from 'mongoose'
// Function to connect to the mongodb database
// ✅ Database Connection Function
const connectDB = async () => {
    try {
        await mongoose.connect(process.env.MONGODB_URI, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            tls: true,  // Force TLS connection
            retryWrites: true
        });
        console.log('✅ Database connected');
    } catch (error) {
        console.error('❌ Database connection error:', error);
        process.exit(1); // ❌ Process exit karo agar connection fail ho
    }
};

export default connectDB