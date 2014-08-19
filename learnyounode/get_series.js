// Requires.
var http = require('http');

// Grab URLs from the command line.
var urls = [];
for (var i = 2, len = process.argv.length; i < len; i += 1) {
  urls.push(process.argv[i]);
}
var results = [];
var count = 0;
var numberOfUrls = urls.length;

function getContent(index) {
  http.get(urls[index], function (response) {
    response.setEncoding('utf8');
    response.on('data', function (data) {
      results[index] += data;
    });
    response.on('end', function () {
      count += 1;
      if (count === numberOfUrls) {
        printResults();
      }
    });
  });
}

function printResults() {
  results.forEach(function (result) {
    console.log(result);
  });
}

for (var i = 0; i < numberOfUrls; i += 1) {
  results.push('');
  getContent(i);
}
