os = require('os')

hostName = os.hostname()
type = os.type()
platform = os.platform()
arch = os.arch()
tempDir = os.tmpdir()

console.log("Your host name is: #{hostName}")
console.log("Your operating system is #{type} '#{platform}' (#{arch})")
console.log("Your temporary directory is located at: #{tempDir}")


