
require('dotenv').config({path:'./config/config.env'})

const app = require('./app');
const PORT = process.env.PORT || 5500;
const connectDB = require('./config/database')

const connectToDatabase = async () => {
    try {
      await connectDB();
      app.listen(PORT, () => {
        console.log(`Server running on PORT: ${PORT}...`);
      });
    } catch (err) {
      console.error('Error connecting to database:', err);
    }
  };
  connectToDatabase();