const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  name: String,
  email: {
    type: String,
    trim: true,
    minlength: 3,
  },
  photoURL: {
    type: String,
    required: false,
  },
  role: {
    type: String,
    required: false,
    enum: ["user", "admin"],
    default: "admin",
  },
  password: {
    type: String,
    required: true,
   
},
  createdAt: {
    type: Date,
    default: Date.now()
},
});

// create model

module.exports = mongoose.model("User", UserSchema);