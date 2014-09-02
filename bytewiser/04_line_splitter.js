var fs = require('fs');
var path = process.argv[2];
var startIndex = 0;
fs.readFile(path, function (err, data) {
  if (err) {
    throw err;
  }
  for (var i = 0, len = data.length; i < len; i += 1) {
    if (data[i] === 0x0a) { // 0x0a = '\n'
      var bufferLength = i - startIndex;
      console.log(data.slice(startIndex, i));
      startIndex = i + 1;
    }
  }
  console.log(data.slice(startIndex))
})
