import mongoose from "mongoose";

export const connectDB = async () => {
  try {
    const conn = await mongoose.connect(process.env.MONGODB_URI);
    console.log(`Mongodb conectado: ${conn.connection.host}`);
  } catch (error) {
    console.log("Mongodb error de conexion: ", error);
  }
};
