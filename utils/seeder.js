const dotenv = require("dotenv");
dotenv.config({ path: "./config/config.env" });
const Product = require("../models/products");
const products = require("../data/products");
const connectDB = require("../config/database");

connectDB();

const seedProducts = async () => {
  try {
    await Product.deleteMany();
    console.log("Products deleted!");

    await Product.insertMany(products);
    console.log(`Products added!`);

    process.exit(1);
  } catch (error) {
    console.log(error.message);
    process.exit(1);
  }
};

seedProducts();
