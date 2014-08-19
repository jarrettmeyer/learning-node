var filter = require("./filter_dir_module");

var dir = process.argv[2];
var extension = process.argv[3];

filter(dir, extension, function (error, files) {

  if (error) {
    return console.error(error);
  }

  files.forEach(function (file) {
    console.log(file);
  });

});
