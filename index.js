require("dotenv").config();
const express = require("express");
const app = express();
const cors = require("cors");
const connectDB = require("./db/databaseConnect");
const port = process.env.PORT || 3000;
const jwt = require("jsonwebtoken");
const stripe = require("stripe")(process.env.STRIPE_SECRET_KEY);

console.log(stripe); // Ensure Stripe is initialized correctly

//? Database connection call
connectDB();

// Handling CORS policy issue
app.use(cors({ origin: "https://eatery-app.vercel.app", credentials: true }));

//? Middleware
app.use(express.json());

//? JWT Authentication
app.post("/jwt", async (req, res) => {
  const user = req.body;
  const token = jwt.sign(user, process.env.ACCESS_TOKEN_SECRET, {
    expiresIn: "1hr",
  });
  res.send({ token });
});

// Imports Routes here
const menuRoutes = require("./routes/menuRoutes");
const cartRoutes = require("./routes/cartRoutes");
const userRoutes = require("./routes/userRoute");
const paymentRoutes = require("./routes/paymentRoute");
const adminStats = require("./routes/adminStats");
const orderStats = require("./routes/orderStats");

app.use("/menu", menuRoutes);
app.use("/cart", cartRoutes);
app.use("/users", userRoutes);
app.use("/payments", paymentRoutes);
app.use("/adminStats", adminStats);
app.use("/orderStats", orderStats);

//? Stripe Payment Routes
app.post("/create-payment-intent", async (req, res) => {
  const { price } = req.body;

  if (isNaN(price) || price < 1) {
    console.log("Invalid Price");
    return res.status(400).json({ error: "Invalid price" });
  }

  try {
    const amount = price * 100; // Convert price to cents

    // Create a PaymentIntent with the order amount and currency
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount,
      currency: "usd",
      payment_method_types: ["card"],
    });

    return res.status(200).send({
      clientSecret: paymentIntent.client_secret,
    });
  } catch (error) {
    console.error("Error creating PaymentIntent:", error);
    return res.status(500).json({ error: error.message || "Internal Server Error" });
  }
});

app.get("/", (req, res) => {
  res.send("Hello Foodie Server is Running!");
});

app.listen(port, () => {
  console.log(`app listening on http://localhost:${port}`);
});
