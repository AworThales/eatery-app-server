const mongoose = require("mongoose");

//? MongoDB Config using Mongoose
async function connectDB() {
  await mongoose
    .connect(
      `mongodb+srv://${process.env.DB_USER}:${process.env.DB_PASSWORD}@cluster0.wdyulyy.mongodb.net/weeat-app?retryWrites=true&w=majority`

    )
    .then(console.log("Successfully connected to MongoDB!"))
    .catch((err) => console.log("Error connecting to DB!", err));
}

module.exports = connectDB;
