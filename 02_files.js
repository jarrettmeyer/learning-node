// Requires
var fs = require("fs");
var os = require("os");

var joinPath = function (a, b) {
  if (!a) {
    a = "/";
  }
  if (a[a.length - 1] !== "/") {
    a = a + "/";
  }
  return a + b;
};

var directory = os.tmpdir();
var encoding = "utf8";
var nonexistentFile = joinPath(directory, "i_do_not_exist.txt");
var fileToCreate = joinPath(directory, "hello.txt");

var onDelete = function (error) {
  if (error) {
    console.error("Error when deleting file!");
    console.error(error);
  }
};

var onFileRead = function (error, data) {
  if (error) {
    console.error("Error when reading file!");
    console.log(error);
  }
  if (data) {
    console.log("File contents:");
    console.log(data);
  }
};

var onFileWritten = function (error, data) {
  if (error) {
    console.error("Error when writing file!");
    console.error(error);
  }
  if (data) {
    console.log(data);
  }
}


console.log("Creating file hello.txt...");
fs.writeFile(fileToCreate, "Hello, World!\n\n", onFileWritten);

console.log("Attempting read non-existent file...");
fs.readFile(nonexistentFile, encoding, onFileRead);

console.log("Attempting to read hello.txt...")
fs.readFile(fileToCreate, encoding, onFileRead)

// Clean up
console.log("Attempting to delete hello.txt...");
fs.unlink(fileToCreate, onDelete);
