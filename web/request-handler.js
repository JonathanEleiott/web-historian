var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  var header = helper.headers;
  var statusCode;

  //ROOT FILE
  if (req.method === 'GET' && req.url === '/') {
    statusCode = 200;

    helper.serveAssets(res, '/index.html', function (file) {
      res.writeHead(statusCode, header);
      res.end(file);
    });
  } else if (req.method === 'GET') {
    //If URL is 'GET' and not our root, check archives for URL
    statusCode = 200;
    archive.isUrlArchived(req.url, function(err, exists) {
      if (exists) {
        helper.serveAssets(res, '/' + req.url, function (file) {
          res.writeHead(statusCode, header);
          res.end(file);
        });
      } else {
        statusCode = 404;
        res.writeHead(statusCode, header);
        res.end();
      }
    });
  } else if (req.method === 'POST') {
    statusCode = 302;
    console.log('req.url is ', req.url);
    archive.addUrlToList (req.url, function (err) {
      if (err) {
        console.log('error on POST: ', err);
      }
      res.writeHead(statusCode, header);
      res.end();
    });
  }

};
