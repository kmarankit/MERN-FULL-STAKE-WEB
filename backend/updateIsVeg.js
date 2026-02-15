import mongoose from "mongoose";
import dotenv from "dotenv";
import Item from "./modals/item.js";

dotenv.config();

const fixUrls = async () => {
  await mongoose.connect(process.env.MONGO_URI);
  console.log("DB Connected");

  const items = await Item.find();

  for (let item of items) {
    if (item.imageUrl.includes("localhost")) {
      const correctUrl = item.imageUrl.replace(
        "http://localhost:4000",
        ""
      );

      item.imageUrl = correctUrl;
      await item.save();

      console.log("Fixed:", item.name);
    }
  }

  console.log("All URLs cleaned.");
  process.exit();
};

fixUrls();
