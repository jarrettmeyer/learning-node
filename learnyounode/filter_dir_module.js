var fs = require("fs");
var path = require("path");

var filter = function (dir, extension, callback) {

  var extensionWithDot = '.' + extension;

  fs.readdir(dir, function (error, files) {

    if (error) {
      return callback(error, null);
    }

    // Makes use of the Array.filter method.
    var filteredFiles = files.filter(function (file) {
      return path.extname(file) === extensionWithDot;
    });

    return callback(null, filteredFiles);
  })

};

module.exports = filter;
