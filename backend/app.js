require("dotenv").config();

const path = require("path");

const cors = require("cors");
const express = require("express");
const mongoose = require("mongoose");
const helmet = require("helmet");
const compression = require("compression");

const loginRoute = require("./route/loginRoute");
const prepareRoute = require("./route/prepareRoute");

const authMiddleware = require("./middleware/authMiddleware");

const app = express();

app.use("*", cors());
app.use(helmet({ contentSecurityPolicy: false }));
app.use(compression());
app.use(express.json());

app.use("/oisp/upload", express.static(path.join(__dirname, "upload")));

//prepare database
app.use("/oisp/prepare", prepareRoute);
app.use("/oisp/auth", loginRoute);

//check authenticated
app.use(authMiddleware.isAuth);

//route
// app.use("/oisp/purchaseTracking", facilityRoute);

//Error handling
app.use((error, req, res, next) => {
  if (res.headerSent) {
    return next(error);
  }
  res.status(error.code || 500);
  res.json({ message: error.message || "An unknown error occurred!" });
});

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);
mongoose.set("useUnifiedTopology", true);

mongoose
  .connect(process.env.DB_URL)
  .then(() => {
    app.listen(process.env.PORT || 5000);
  })
  .catch((err) => {
    console.log(err);
  });

// require("crypto").randomBytes(64).toString('hex')
