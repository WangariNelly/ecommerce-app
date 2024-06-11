const path = require('path');
require('dotenv').config({path:'Backend/config/config.env'})
const app = require('./app');
const PORT = process.env.PORT || 5500;
// console.log('Environment variables loaded:', process.env);

app.listen( PORT, () => {
    console.log(`Server running on PORT: ${ PORT }....`)
})
