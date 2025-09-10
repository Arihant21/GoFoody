const express = require("express");
require("dotenv").config(); // load env variables
const mongoDB = require("./db");

const app = express();
const port = process.env.PORT || 5000; // get from .env

app.use((req, res, next)=>{
  res.setHeader("Access-Control-Allow-Origin", "https://gofoodyarihant.netlify.app/");
  res.header(
    "Access-Control-Allow-Headers",
    "Origin, X-Requested-With, Content-Type, Accept"
  );
  next()
});

// connect to DB
mongoDB();

app.get("/", (req, res) => {
  res.send("HelloWorld!");
});

app.use(express.json());
app.use('/api', require('./Routes/CreatUser'));
app.use('/api', require('./Routes/DisplayData'));
app.use('/api', require('./Routes/OrderData'));

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`);
});
