var vars = require("./vars");

var TaskStorage = function (fs) {

  if (!fs) {
    throw "Undefined argument: fs";
  }

  var self = this;
  self.fs = fs;

  self.getTasks = function (callback) {
    fs.readFile(vars.datafile, vars.datafileEncoding, function (error, data) {
      var tasks = null;
      if (error) {
        console.error(error);
      } else {
        tasks = JSON.parse(data);
      }
      if (callback) {
        callback(error, tasks);
      }
    });
  };

  self.saveTasks = function (tasks, callback) {
    var content = JSON.stringify(tasks);
    fs.writeFile(vars.datafile, content, function (error, data) {
      if (error) {
        console.error("Error when writing tasks to data file. File: " + self.datafile);
        console.error("Error: " + error);
      }
      if (callback) {
        callback(error);
      }
    });
  };

};

module.exports = TaskStorage;