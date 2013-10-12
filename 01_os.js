os = require('os');

var hostName = os.hostname();
var type = os.type();
var platform = os.platform();
var arch = os.arch();
var tempDir = os.tmpdir();

console.log("Your host name is: " + hostName);
console.log("Your operating system is " + type + " '" + platform + "' (" + arch + ")");
console.log("Your temporary directory is located at: " + tempDir);

