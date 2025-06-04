const api = require("./routes");
const express = require("express");
const cookieparser = require("cookie-parser");
const cors = require("cors");
require("dotenv").config();
const session = require("express-session");
const connectDb = require("./config/database");
require("./utils/cronjob");
const app = express();
app.use(cors({ origin: "http://localhost:5173", credentials: true }));
app.use(express.json());
app.use(cookieparser());
// app.use(express.urlencoded({extended:true}))

app.use("/api", api);

connectDb()
  .then(() => {
    console.log("data base connected successfully");
    app.listen(3001, () => {
      console.log(`server is running at port 3001`);
    });
  })
  .catch(() => {
    console.log("database is not connected ");
  });
