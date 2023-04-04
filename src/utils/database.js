require("dotenv").config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", false);

mongoose
  .connect(process.env.MONGO_URL, {
    serverSelectionTimeoutMS: 3000,
    useNewUrlParser: true,
  })
  .then(() => console.log("DB connection established"))
  .catch((err) => console.log(err));
