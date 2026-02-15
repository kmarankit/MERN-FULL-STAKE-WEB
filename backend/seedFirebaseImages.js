import fs from "fs";
import path from "path";
import mongoose from "mongoose";
import { bucket } from "./GoogleAuth/firebaseAdmin.js";
import Item from "./modals/item.js";
import dotenv from "dotenv";

dotenv.config();

console.log("MONGO_URI:", process.env.MONGO_URI);

const uploadsFolder = path.join(process.cwd(), "uploads");

const uploadImagesToFirebase = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("DB Connected");

    const files = fs.readdirSync(uploadsFolder);

    for (const file of files) {
      const localFilePath = path.join(uploadsFolder, file);

      const firebaseFile = bucket.file(`menu/${file}`);

      await bucket.upload(localFilePath, {
        destination: `menu/${file}`,
        public: true,
      });

      const publicUrl = `https://storage.googleapis.com/${bucket.name}/menu/${file}`;

      // Update MongoDB where imageUrl contains file name
      await Item.updateMany(
        { imageUrl: { $regex: file } },
        { imageUrl: publicUrl }
      );

      console.log(`Uploaded & Updated: ${file}`);
    }

    console.log("All images migrated successfully!");
    process.exit();

  } catch (err) {
    console.error(err);
    process.exit(1);
  }
};

uploadImagesToFirebase();
