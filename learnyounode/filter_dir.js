var fs = require("fs");
var path = require("path");

var dir = process.argv[2];
var extension = process.argv[3];
var extensionWithDot = '.' + extension;

fs.readdir(dir, function (err, files) {
  var fileCount = 0;
  files.forEach(function (file) {
    if (path.extname(file) === extensionWithDot) {
      console.log(file);
    }
  })
});
