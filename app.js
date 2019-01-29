const express = require("express");
const app = express();

app.use("/add-product", (req, res, next) => {
 console.log("In another middleware");
 res.send("<h1>add-product</h1>");
});

app.use("/", (req, res, next) => {
 console.log("In another middleware");
 res.send("<h1>fsfs</h1>");
});

app.listen(3100, () => {
 "back-end server started...";
});
