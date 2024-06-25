require("dotenv").config({ path: "./config/config.env" });
const app = require("./app");
const connectDB = require("./config/database");

//connecting to database
connectDB();

const server = app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode...`);
});
  

//Handle Unhandled Promise Rejection errors
process.on('unhandledRejection', (err) => {
  console.error('ERROR:', err.message);
  console.error('Server shutting down due to unhandled Promise rejection.');

  server.close(() => {
    process.exit(1);
  });
});
