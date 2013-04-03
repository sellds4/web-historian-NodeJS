// var index = require('./web/public/index.html');
var fs = require('fs');
var qs = require('querystring');
var url = require('url');
var reg = /(www\.){0,1}[a-zA-Z0-9\.\-]+\.[a-zA-Z]{2,5}[\.]{0,1}/;
var dir = '/Users/Catalyst/code/AndrewMagliozzi/web-historian/data/sites.txt';

exports.datadir = __dirname + "/data/sites.txt"; // tests will need to override this.



exports.handleRequest = function (req, res) {
  var data;
  if (req.method === 'GET' && req.url === "http://127.0.0.1:8080/") {
    res.writeHead(200, {});
    data = fs.readFileSync('./web/public/index.html', ['utf8']);
    res.end(data);
  } else if (req.method === 'GET' && reg.test(req.url)) {
    res.writeHead(200, {});
    data = fs.readFileSync('./data/sites.txt', ['utf8']);
    res.end(data);
  } else if (req.method === 'POST') {
    res.writeHead(302, {'Location' : '/'});
    data = '';
    req.on('data', function(chunk){
      data += chunk.toString();
      data = qs.parse(data);
    });
    req.on('end', function(){
      console.log(fs.readFileSync(dir, ['utf8']));
      if (fs.readFileSync(dir, ['utf8']).indexOf(data.url) === -1) {
        fs.appendFile(dir, data.url + '\n');
      }
      res.end();
    });
  } else {
    res.writeHead(404, {});
    res.end();
  }

};
