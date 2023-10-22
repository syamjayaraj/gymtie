const express = require("express");
const app = express();
const cors = require("cors");
const bodyParser = require("body-parser");
const logger = require("morgan");
const mongoose = require("mongoose");

mongoose.set("useNewUrlParser", true);
mongoose.set("useFindAndModify", false);
mongoose.set("useCreateIndex", true);

const port = process.env.PORT || 3026;
const env = process.env.NODE_ENV || "development";
const config = require("./config")[env];

const index = require("./routes");
const dashboard = require("./routes/dashboard");
const admins = require("./routes/admins");
const owners = require("./routes/owners");
const gyms = require("./routes/gyms");
const members = require("./routes/members");
const payments = require("./routes/payments");

app.use(logger("dev"));

const dbUrl = config.dbUrl;

var options = {
  keepAlive: 1,
  connectTimeoutMS: 30000,
  useNewUrlParser: true,
  useUnifiedTopology: true,
};

mongoose.connect(dbUrl, options, (err) => {
  if (err) console.log(err);
});

app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use("/", index);
app.use("/dashboard", dashboard);
app.use("/admins", admins);
app.use("/owners", owners);
app.use("/gyms", gyms);
app.use("/members", members);
app.use("/payments", payments);

app.listen(port, function () {
  console.log("Runnning on " + port);
});
module.exports = app;
