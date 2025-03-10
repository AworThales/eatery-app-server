
const Payment = require("../models/Payment");


// Get all orders stats
const getAllOrderStats = async (req, res) => {
  try {
    const result = await Payment.aggregate([
        {
            $unwind: "$menuItems"
        },
        {
            $lookup: {
                from: "menus",
                localField: "menuItems",
                foreignField: "_id",
                as: "menuItemDetails"
            }
        },
        {
            $unwind: "$menuItemDetails"
        },
        {
            $group: {
                _id: "$menuItemDetails.category",
                quantity: {$sum: "$quantity"},
                revenue: {$sum: "$price"}
            }
        },
        {
            $project: {
                _id: 0,
                category: "$_id",
                quantity: "$quantity",
                revenue: "$revenue"
            }
        },
    ]);
    res.status(200).json(result);
  } catch (error) {
    res.status(500).json({ "Internal Server Error": + error.message });
  }
};


module.exports = { getAllOrderStats};
