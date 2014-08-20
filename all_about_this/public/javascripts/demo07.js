// In Google Chrome and NodeJS, console.log is synchronous. In these cases, you
// will see something like:
//
// > Object
//     a: "foo"
//
// In most other browsers, console.log is defined as asynchronous IO. This will
// produce:
//
// > Object
//     a: "bar"
//
// It's important to know the difference!
var obj = { a: "foo" };
console.log(obj);
obj.a = "bar";
