// Sends a message to the running .NET IIS process.
// Returns a Promise.

module.exports = {
  signalNotificationForUser
};

function signalNotificationForUser(userId) {
  return new Promise((resolve, reject) => {
    fs.writeFile("\\\\.\\pipe\\Sabio-iisnode-signalNotificationForUser", String(userId), err => {
      if (err) {
        reject(err);
      } else {
        resolve();
      }
    });
  });
}
