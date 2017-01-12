var fs = require('fs');
var path = require('path');
var _ = require('underscore');

/*
 * You will need to reuse the same paths many times over in the course of this sprint.
 * Consider using the `paths` object below to store frequently used file paths. This way,
 * if you move any files, you'll only need to change your code in one place! Feel free to
 * customize it in any way you wish.
 */

exports.paths = {
  siteAssets: path.join(__dirname, '../web/public'),
  archivedSites: path.join(__dirname, '../archives/sites'),
  list: path.join(__dirname, '../archives/sites.txt')
};

// Used for stubbing paths for tests, do not modify
exports.initialize = function(pathsObj) {
  _.each(pathsObj, function(path, type) {
    exports.paths[type] = path;
  });
};

// The following function names are provided to you to suggest how you might
// modularize your code. Keep it clean!

exports.readListOfUrls = function(func) {
  var listOfUrls = [];
  fs.readFile(this.paths.list, 'utf8', function(err, data) {
    listOfUrls.push(data);
    listOfUrls = listOfUrls[0].replace(/\r?\n|\r/g, ',');
    listOfUrls = listOfUrls.split(',');
    return func(err, listOfUrls);
  }); 
};

exports.isUrlInList = function(url, func) {
  this.readListOfUrls(function(err, urls) {
    for (var i = 0; i < urls.length; i++) {
      if (urls[i] === url) {
        return func(err, true);
      }
    }
    return func(err, false);
  });
};

exports.addUrlToList = function(url, func) {
  fs.writeFile(this.paths.list, url, 'utf8', function(err) {
    if (!err) {
      func(err);
    }
  });
};

exports.isUrlArchived = function(url, func) {
  fs.readFile(this.paths.archivedSites + '/' + url, 'utf8', function (err, data) {
    if (data) {
      return func(err, true);
    } else if (!data) {
      err = null;
      return func(err, false);
    }
  });
};

exports.downloadUrls = function(array) {
  for (var i = 0; i < array.length; i++ ) {
    fs.writeFile(this.paths.archivedSites + '/' + array[i], 'utf8', function (err) {
      if (err) {  
        console.log('error is ', err);
      }
    });
  }
};
