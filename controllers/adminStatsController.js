const mongoose = require("mongoose"); // Import mongoose here
const User = require("../models/User.js");
const Menu = require("../models/menu");
const Payment = require("../models/Payment");



const getAdminStats = async (req, res) => {
  
  try {
    const users = await User.countDocuments();
    const menuItems = await Menu.countDocuments();
    const orders = await Payment.countDocuments();
    const result = await Payment.aggregate([{
        $group: {
            _id: null,
            totalRevenue: {
                $sum: "$price"
            }
        }
    }])

    const revenue = result.length > 0 ? result[0].totalRevenue : 0;

    res.status(200).json({
      users,
      menuItems,
      orders,
      revenue,
    });
  } catch (error) {
    res.status(500).json({ "Internal Server Error": + error.message });
  }
};




// confirm payment status use in orders
module.exports = { getAdminStats };
