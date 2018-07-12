const express = require("express");
const nconf = require("nconf");

nconf
  .argv()
  .env({ lowerCase: true })
  .defaults({ port: 3100 });

const app = express();
app.use("/node-api/app.js", require("./routes"));

const port = nconf.get("port");

app.listen(port, () => console.log(`Listening on port ${port}`));
