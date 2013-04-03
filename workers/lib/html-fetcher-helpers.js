var fs = require('fs');
var fileTxt;

exports.readUrls = function(filePath, callBack){
  // fixme -- to take a file path and return a list of URLS\
  fileTxt = fs.readFileSync(filePath, ['utf8']);
  fileTxt = fileTxt.split('\n');
  return callBack(fileTxt);
};

exports.downloadUrls = function(urls){
  Look in */data/sites:
    If not in -> writeFileSync with document HTML
  // fixme -- to take a list of URLS and download them to a specified directory in Data
  exports.readUrls(filePath, exports.downloadUrls(urls))
};

var site = $(document).val();
writeFileSync()