var fs = require("fs");
var path = process.argv[2];
fs.readFile(path, 'utf8', function (err, contents) {
  var lines = contents.split("\n");
  var numberOfNewlines = lines.length - 1;
  console.log(numberOfNewlines);
});
