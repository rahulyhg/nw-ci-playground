prettyJs = require('pretty-js');
var request = require('request');
const fs = require('fs');

module.exports = {

  captureHTTPHeader : function (url) {

    request(url, {method: 'HEAD'}, function (err, res, body){
      let ans = JSON.stringify(res.headers);
      fs.writeFileSync(process.cwd() + "/Result/header.txt",prettyJs(ans));
    });
  }
}