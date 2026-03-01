import mongoose from "mongoose";
import bcrypt from "bcryptjs";
import dotenv from "dotenv";
import Admin from "./models/adminModel.js";

dotenv.config();

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.log(err));

const createAdmin = async () => {
  try {
    const hashedPassword = await bcrypt.hash("admin123", 10);

    await Admin.create({
    name: "Super Admin",
    email: "admin@gmail.com",
    password: "admin123",   // plain text
    role: "admin",
    });

    console.log("✅ Admin Created Successfully");
    process.exit();
  } catch (error) {
    console.error(error);
    process.exit(1);
  }
};

createAdmin();