// Solution without using 'through' library
// process.stdin.on("data", function (data) {
//   if (data) {
//     process.stdout.write(data.toString().toUpperCase());
//   }
// });

var through = require('through');

var transform = through(function (buffer) {
  this.queue(buffer.toString().toUpperCase());
});

process.stdin.pipe(transform).pipe(process.stdout);
