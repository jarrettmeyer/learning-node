var sum = 0;
for (var i = 2, len = process.argv.length; i < len; i += 1) {
  sum += Number(process.argv[i]);
}
console.log(sum);
