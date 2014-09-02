// This is not a good solution. It requires the entire stream to be stored into
// memory, instead of piping the streams straight from stdin to stdout. Work on
// this one, without using the split and through libraries, if possible.

var lineCounter = 0;
var text = "";

process.stdin.on("data", function (data) {
  text += data.toString();
});
process.stdin.on("end", function () {
  var lines = text.split("\n");
  lines.forEach(function (line) {
    lineCounter += 1;
    if (lineCounter % 2 === 1) {
      process.stdout.write(line.toLowerCase());
    } else {
      process.stdout.write(line.toUpperCase());
    }
    process.stdout.write("\n");
  });
});
