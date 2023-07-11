const express = require("express");
const app = express();
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const port = process.env.PORT || 8000;

const userRoute = require("./routes/user");
const authRoute = require("./routes/auth");
const productRoute = require("./routes/products");
const cartRoute = require("./routes/cart");
const orderRoute = require("./routes/orders");
//const paymentRoute = require("./routes/paymentRoute");
const cors = require("cors");

dotenv.config();

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL)
  .then(() => console.log("DB Connection Successfull!"))
  .catch((err) => {
    console.log(err);
  });

app.get("/backend/test", () => {
  console.log("test is successfull");
});

app.use(cors());
app.use(express.json());
app.use("/backend/auth", authRoute);
app.use("/backend/user", userRoute);
app.use("/backend/products", productRoute);
app.use("/backend/cart", cartRoute);
app.use("/backend/orders", orderRoute);
//app.use("/api/checkout", paymentRoute);
app.listen(port, () => console.log(`Server started on port ${port}`));
