const fs = require("fs");

// Sends a message to the running .NET IIS process.
// Returns a Promise.

module.exports = {
  signalNotificationForUser
};

function signalNotificationForUser(userId) {
  return new Promise((resolve, reject) => {
    console.log("sending to .net");
    fs.writeFile("\\\\.\\pipe\\Sabio-iisnode-signalNotificationForUser", String(userId), err => {
      if (err) {
        console.log("send to .net error", err);
        reject(err);
      } else {
        console.log("send to .net success");
        resolve();
      }
    });
  });
}
