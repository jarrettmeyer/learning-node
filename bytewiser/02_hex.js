var args = process.argv.slice(2);
var buffer = new Buffer(args);
console.log(buffer.toString("hex"));
