const mongoose = require("mongoose");
require("dotenv").config(); // load .env

const mongoURI = process.env.MONGO_URI; // use env variable

const mongoDB = async () => {
  try {
    await mongoose.connect(mongoURI);
    console.log("MongoDB connected successfully");

    // fetch data from mongodb atlas using mongoose

    // Use the GoFoodMern DB explicitly
    const db = mongoose.connection.useDb("GoFoodMern");

    // Get the collections
    const foodCollection = db.collection("food_items");
    const categoryCollection = db.collection("foodCategory");

    // Fetch all data
    const data = await foodCollection.find({}).toArray();
    const catData = await categoryCollection.find({}).toArray();

    // store globally
    global.food_items = data;
    global.foodCategory = catData;

    console.log(global.food_items);
    console.log( global.foodCategory);

  } catch (error) {
     console.error("MongoDB connection error:", error);
     process.exit(1);
   }
};

module.exports = mongoDB;
