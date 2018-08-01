const express = require("express");

const router = express.Router();

router.get("/auth", (req, res) => {
  const user = req.user;

  const message =
    "JWT token info:\n" + `User ID:  ${user.id}\n` + `Username: ${user.name}\n` + "Roles: " + user.roles.join(", ");

  res.type("Content-Type", "text/plain").end(message);
});

module.exports = router;
