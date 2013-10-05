# Requires
fs = require("fs")
os = require("os")

directory = os.tmpdir()
encoding = "utf8"
nonexistentFile = "#{directory}i_do_not_exist.txt"
fileToCreate = "#{directory}hello.txt"

onDelete = (error) ->
	if (error)
		console.error("Error when deleting file!")
		console.error(error)

onFileRead = (error, data) ->
	if (error)
		console.error("Error when reading file!")
		console.error(error)
	if (data)
		console.log("File contents:")
		console.log(data)

onFileWritten = (error, data) ->
	if (error)
		console.error("Error when writing file!")
		console.error(error)
	if (data)
		console.log(data)


console.log("Creating file hello.txt...")
fs.writeFile(fileToCreate, "Hello, World!\n\n", onFileWritten)

console.log("Attempting read non-existent file...")
fs.readFile(nonexistentFile, encoding, onFileRead)

console.log("Attempting to read hello.txt...")
fs.readFile(fileToCreate, encoding, onFileRead)

# Clean up
console.log("Attempting to delete hello.txt...")
fs.unlink(fileToCreate, onDelete)
