process.stdin.on("data", function (data) {
  var a = new Uint8Array(data);
  var j = JSON.stringify(a);
  console.log(j);
});
