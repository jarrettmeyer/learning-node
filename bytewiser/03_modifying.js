var chars = "";
process.stdin.on("data", function (chunk) {
  chars += chunk;
});
process.stdin.on("end", function () {
  var buffer = new Buffer(chars, "utf8");
  for (var i = 0, len = buffer.length; i < len; i += 1) {
    if (buffer[i] === 0x2e) { // If a '.', replace with '!'
      buffer[i] = 0x21;
    }
  }
  console.log(buffer);
});
