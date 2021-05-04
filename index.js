const express = require("express");
const app = express();
const port = process.env.PORT || 8000;
const expressEjsLayouts = require("express-ejs-layouts");
const db = require("./config/mongoose");

app.use(express.urlencoded({ extended: true }));

// Body Parser middleware
app.use(express.json());

app.use(express.static("./assets"));

app.use(expressEjsLayouts);
app.set("expres layouts", true);
// Extract style and scripts from sub pages
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// set up the view engine
app.set("view engine", "ejs");
app.set("views", "./views");

// // Home page route
// app.get("/", (req, res) => {
//   return res.send("<h1>Hello, from server side</h1>");
// });

app.set("query parser", "simple");
app.use("/", require("./Routes/home"));

// reports API Routes
app.use("/reports", require("./Routes/api/reports"));

app.listen(port, (err) => {
  if (err) {
    console.log("Error in connecting the server : " + err);
    return;
  }
  console.log(`Server is up and running on port ${port}`);
});

module.exports = app;
