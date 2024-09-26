require("dotenv").config();
const express = require("express");
const connectDB = require("./database");
const cors = require("cors");
const router = require("./routes/Allroutes");

const port = process.env.PORT || 8080;
const app = express();

// Middleware
app.use(cors());
app.use(express.json());

// Connect to the database
connectDB();

// Routes
app.use("/api/users", router);

app.listen(port, () => {
  console.log("App is running at port", port);
});
