require("dotenv").config({ path: "./config/config.env" });
const app = require("./app");
const connectDB = require("./config/database");

//connecting to database
connectDB();

app.listen(process.env.PORT, () => {
  console.log(`Server running on PORT: ${process.env.PORT} in ${process.env.NODE_ENV} mode...`);
});
