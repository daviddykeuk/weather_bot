const https = require("https");

module.exports.get = url => {
  return new Promise((resolve, reject) => {
    const req = https.get(url, resp => {
      let data = "";

      resp.on("data", chunk => {
        data += chunk;
      });

      resp.on("end", () => {
        resolve(JSON.parse(data));
      });

      resp.on("error", err => {
        console.log(err);
        reject(err);
      });
    });
    req.on("error", reject);
  });
};
