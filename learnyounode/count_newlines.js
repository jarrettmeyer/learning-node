var fs = require("fs");
var path = process.argv[2];
var contents = fs.readFileSync(path, 'utf8');
var lines = contents.split("\n");
var numberOfNewlines = lines.length - 1;
console.log(numberOfNewlines);
