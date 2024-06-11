const Product = require('../models/products');
const dotenv = require('dotenv');
const connectDB = require('../config/database');

const products = require('../data/products');

dotenv.config({ path: './config/config.env' });

connectDB();

const seedProducts = async () => {
    try{

        await Product.deleteMany();
        console.log('Products deleted!')

        await Product.insertMany(products);
        console.log(`Products added!`);

        process.exit(1);

    }catch(error) {
        console.log(error.message);
        process.exit(1);
    }
}

seedProducts();