import mongoose from "mongoose";
const Connection = async (username, password) => {
  const URL = `mongodb+srv://vishalverma1273:vishalverma1273@cluster0.sdwpgar.mongodb.net/`;
  try {
    await mongoose.connect(URL);
    console.log("Database connected successfully");
  } catch (error) {
    console.log("Error while connecting with the database", error);
  }
};

export default Connection;

// , { userNewUrlParser: true }
