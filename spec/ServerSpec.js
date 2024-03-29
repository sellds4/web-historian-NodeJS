var handler = require("../web/request-handler");
handler.datadir = __dirname + "/testdata/sites.txt"; // this makes a new directory for our testing environment
var stubs = require("./helpers/stubs");
var fs = require('fs');
var res;

// allows us to run tests async
function async(cb){
  waits(200);
  runs(cb);
}

beforeEach(function(){
  res = new stubs.Response();
});

describe("Node Server Request Listener Function", function() {

  it("Should answer GET requests for /", function() {
    var req = new stubs.Request("http://127.0.0.1:8080/", "GET");
    handler.handleRequest(req, res);
    async(function(){
      expect(res._responseCode).toEqual(200);
      expect(res._data).toMatch(/<input/); // the resulting html should have an input tag  -- > use node to open that file and send it to the user
      expect(res._ended).toEqual(true);
    });
  });

  it("Should answer GET requests for archived websites", function() {
    var fixtureName = "www.google.com";
    var req = new stubs.Request("http://127.0.0.1:8080/" + fixtureName, "GET");
    handler.handleRequest(req, res);
    async(function(){
      expect(res._responseCode).toEqual(200);
      expect(res._data).toMatch(/google/); // the resulting html should have the text "google" -- > send out the pages we've archived upon request
      expect(res._ended).toEqual(true);
    });
  });

  it("Should accept posts to /", function() {
    fs.writeFileSync(handler.datadir, ""); // reset the test file -- > this happens automatically when this test runs

    var url = "www.example.com";
    var req = new stubs.Request("http://127.0.0.1:8080/", "POST", {url: url});

    handler.handleRequest(req, res);

    var fileContents = fs.readFileSync(handler.datadir, ['utf8']);
    expect(res._responseCode).toEqual(302);
    expect(fileContents).toEqual(url + "\n");
    expect(res._ended).toEqual(true);
  });

  it("Should 404 when asked for a nonexistent file", function() {
    var req = new stubs.Request("http://127.0.0.1:8080/arglebargle", "GET");
    handler.handleRequest(req, res);
    async(function() {
      expect(res._responseCode).toEqual(404);
      expect(res._ended).toEqual(true);
    });
  });

});
