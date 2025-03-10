const User = require("../models/User");


// get all users
const getAllUsers = async (req, res) => {
  try {
    const users = await User.find({});
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// post a new user
const createUser = async (req, res) => {
  const user = req.body;
  const query = { email: user.email };
  try {
    const existingUser = await User.findOne(query);
    if (existingUser) {
      return res.status(302).json({ message: "User already exists!" });
    }
    const result = await User.create(user);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// delete a user
const deleteUser = async (req, res) => {
  const userId = req.params.id;
  try {
    const deletedUser = await User.findByIdAndDelete(userId);
    // if user not found
    if(!deletedUser){
        return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json({message: "User deleted successfully!"})
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

// GET Admin By Email
const getAdmin = async (req, res) => {
  try {
    const email = req.params.id;
    console.log("Looking for user with email:", email); // Log the email you're searching for
    const user = await User.findOne({ email });
    console.log("User found:", user); // Log the user result

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    if (email !== req.decoded.email) {
      return res.status(403).send({ message: "Forbidden access" });
    }

    const admin = user.role === "admin";
    console.log("User is admin:", admin); // Log the admin status
    res.status(200).json({ admin });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};


// make admin of a user
const makeAdmin = async (req, res) => {
    const userId = req.params.id;
    const {name, email, photoURL, role} = req.body;
    try {
        const updatedUser = await User.findByIdAndUpdate(
            userId, 
            {role: "admin"},
            {new: true, runValidators: true}
        );

        if(!updatedUser){
            return res.status(404).json({message: "User not found"})
        }
        res.status(200).json(updatedUser)
        
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
}

// Make Admin back to User
const makeUserBack = async (req, res) => {
  const userId = req.params.id;
  try {
    const updatedUser = await User.findByIdAndUpdate(
      userId,
      {
        role: "user",
      },
      { new: true, runValidators: true }
    );
    if (!updatedUser) {
      return res.status(404).json({ message: "User not found!" });
    }
    res.status(200).json(updatedUser);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};



module.exports = {
  getAllUsers,
  createUser,
  deleteUser,
  getAdmin,
  makeAdmin,
  makeUserBack
};
