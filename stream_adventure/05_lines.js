// split is a library that turns a (stream) buffer into a line buffer.
var split = require('split');
var through = require('through');
var lineCount = 0;

function isOdd(value) {
  return value % 2 === 1;
}

var transform = through(function (buffer) {
  lineCount += 1;
  var line = buffer.toString();
  if (isOdd(lineCount)) {
    this.queue(line.toLowerCase());
  } else {
    this.queue(line.toUpperCase());
  }
  this.queue('\n');
});

process.stdin.pipe(split()).pipe(transform).pipe(process.stdout);
