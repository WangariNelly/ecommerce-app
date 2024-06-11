const mongoose = require('mongoose');
 

const connectDB = () => {
    mongoose.connect(process.env.DB_LOCAL_URI, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }).then(con => {
        console.log(`MongoDB connected with HOST: ${con.connection.host}`);
    })
}

module.exports = connectDB;