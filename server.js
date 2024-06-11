
require('dotenv').config({path:'./config/config.env'})

const app = require('./app');
const PORT = process.env.PORT || 5500;
const connectDB = require('./config/database')
// console.log('Environment variables loaded:', process.env);

//connecting to db and server
// const connectToDatabase = async () => {
//     try {
//         await connectDB()
// }
// app.listen(PORT,console.log(`Server running on PORT: ${ PORT }....`))

// } catch (err){
//    console.log(err);
// }


const connectToDatabase = async () => {
    try {
      await connectDB();
      console.log('Connected to database successfully.');
    } catch (err) {
      console.error('Error connecting to database:', err);
    }
  };
  (async () => {
    await connectToDatabase();
    app.listen(PORT, () => {
      console.log(`Server running on PORT: ${PORT}...`);
    });
  })();
  