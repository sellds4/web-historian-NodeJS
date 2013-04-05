// eventually, you'll have some code here that uses the tested helpers
// to actually download the urls you want to download.

var path = require("path"),
    urls = require('./lib/html-fetcher-helpers'),
    sites = path.join(__dirname, '..', 'data/sites.txt');

urls.readUrls(sites, urls.downloadUrls);
