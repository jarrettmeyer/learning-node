var concat = require('concat-stream');

// concat must work with a callback. The result cannot be piped, because the
// output of concat is a buffer, not a stream.

process.stdin.pipe(concat(function (buffer) {
  var body = buffer.toString();
  for (var i = body.length - 1; i >= 0; i -= 1) {
    process.stdout.write(body[i]);
  }
}));
