var char = process.argv[2];
var array32 = new Uint32Array([char]);
var array16 = new Uint16Array(array32.buffer);
console.log(JSON.stringify(array16));
