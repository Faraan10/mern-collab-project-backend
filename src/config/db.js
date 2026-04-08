import mongoose from "mongoose";

const connectDB=async()=>{

  try{
    const connStr=process.env.CONNECTION_STRING;

      if (!connStr) {
      throw new Error("CONNECTION_STRING is missing");
    }

     const conn = await mongoose.connect(connStr,{
      serverSelectionTimeoutMS:5000,
    });
    
    console.log(`MongoDB Connected: ${conn.connection.host}`);
  }
  catch(error){
    console.log("MongoDB connection error:", error.message);

    process.exit(1);
  }

}
export default connectDB;
