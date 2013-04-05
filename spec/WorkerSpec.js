var stubs = require("./helpers/stubs");
var htmlFetcherHelpers = require("../workers/lib/html-fetcher-helpers");
var fs = require('fs');
var urlSource = __dirname + "/testdata/sites.txt";
var http = require('http-get');

describe("html fetcher helpers", function(){

  it("should have a 'readUrls' function", function(){
    var urlArray = ["example1.com", "example2.com"];

    fs.writeFileSync(__dirname + "/testdata/sites.txt", urlArray.join("\n"));

    var resultArray;
    var result = htmlFetcherHelpers.readUrls(urlSource, function(urls){
      resultArray = urls;
    });

    waits(200);
    runs(function(){
      expect(resultArray).toEqual(urlArray);
    });
  });

  it("should have a 'downloadUrls' function", function(){  // we need to modify this to test our own downloadURLs function
    var result = htmlFetcherHelpers.readUrls(urlSource, htmlFetcherHelpers.downloadUrls);
    expect(result).toBeTruthy();
  });
});