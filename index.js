const express = require("express");
const app = express();
const port = process.env.PORT || 8000;

// Home page route
app.get("/", (req, res) => {
  return res.send("<h1>Hello, from server side</h1>");
});

app.listen(port, (err) => {
  if (err) {
    console.log("Error in connecting the server : " + err);
    return;
  }
  console.log(`Server is up and running on port ${port}`);
});
