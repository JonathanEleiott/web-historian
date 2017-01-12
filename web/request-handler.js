var path = require('path');
var archive = require('../helpers/archive-helpers');
var helper = require('./http-helpers.js');
// require more modules/folders here!

exports.handleRequest = function (req, res) {
  
  var header = helper.headers;
  var statusCode;

  if (req.method === 'GET' && req.url === '/') {
    statusCode = 200;

    helper.serveAssets(res, req.url, function (file) {
      res.writeHead(statusCode, header);
      console.log('file is ', file);
      res.end(file);
    });
  }
};
