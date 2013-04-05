var fs = require('fs'),
    path = require('path'),
    http = require('http-get'),
    sitesDir = path.join(__dirname, '../..', 'data/sites/'),
    fileTxt;

exports.readUrls = function(filePath, callBack){
  // fixme -- to take a file path and return a list of URLS\
  fileTxt = fs.readFileSync(filePath, ['utf8']);
  fileTxt = fileTxt.split('\n');
  return callBack(fileTxt);
};

exports.downloadUrls = function(urls){
  for(var i = 0; i < urls.length; i++) {
    if (urls[i]) {
      http.get('http://' + urls[i], sitesDir + urls[i], function (error, result) {
        if (error) {
          console.log(error);
        } else {
            console.log('It\'s saved!');
        }
      });
    }
  }
  return true;
};

//   Look in */data/sites:
//     If not in -> writeFileSync with document HTML
//   // fixme -- to take a list of URLS and download them to a specified directory in Data
//   exports.readUrls(filePath, exports.downloadUrls(urls))
// };
