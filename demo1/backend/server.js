const express = require("express");
const app = express();

app.get(
  "/",
  (req, res, next) => {
    next();
  },
  (req, res) => {
    res.json({ result: "ok" });
  }
);

// http://localhost:8081/login?username=admin&password=1234
app.get("/login", (req, res) => {
  res.json({ result: "ok", input: req.query });
});

app.listen(8081, () => console.log("server is running."));
