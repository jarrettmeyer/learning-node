var buffers = [];
process.stdin.on("data", function (chunk) {
  buffers.push(chunk);
});
process.stdin.on("end", function () {
  var buffer = Buffer.concat(buffers);
  console.log(buffer);
})
