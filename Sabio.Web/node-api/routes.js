const express = require("express");
const { executeJson } = require("./sql");

const app = express.Router();
module.exports = app;

app.get("/api/test/node", async (req, res) => {
  try {
    let json = await executeJson(
      "SELECT TOP 1 * FROM SchoolsInfo FOR JSON AUTO"
    );
    res.type("application/json").end(json);
  } catch (e) {
    res
      .status(500)
      .type("text/plain")
      .end(String(e));
  }
});
