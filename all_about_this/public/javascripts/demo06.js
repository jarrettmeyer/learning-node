// This is demonstrating the 'call' function. The 'call' function is an
// attribute of all JavaScript functions.
var Speaker = (function () {
  function Speaker(name) {
    this.name = name;
  }
  Speaker.prototype.sayHello = function () {
    alert(this.name + ' says, "Hello."');
  };
  return Speaker;
}).call(this);

var QuietPerson = (function () {
  function QuietPerson(name) {
    this.name = name;
  }
  QuietPerson.prototype.sayHello = function () {
    alert(this.name + ' whispers, "Shhhh."');
  };
  return QuietPerson;
}).call(this);

var quietPerson = new QuietPerson("Quiet Carol");
var speaker = new Speaker("Loud Bob");
var counter = 0;
var optCount = 3;

$("#my-button").on("click", function () {
  if (counter % optCount === 0) {
    speaker.sayHello();
  } else if (counter % optCount === 1) {
    quietPerson.sayHello();
  } else {
    Speaker.prototype.sayHello.call(quietPerson);
  }
  return counter += 1;
});

/* The three popups should be...
      Loud Bob says, "Hello."
      Quiet Carol says, "Shhhh."
      Quiet Carol says, "Hello."

The 'call' function calls an existing function. The first argument to call is
the context of the of the call function. Subsequent arguments to 'call' are the
remaining arguments of the function, in order as they appear in the function
declaration.

This 'call' works because the sayHello method requires that the context have a
'name' attribute. As long as the contract is met, the function will succeed. In
this case, anything with a name attribute would work.

      // An object literal works just fine.
      Speaker.prototype.sayHello.call({ name: 'Diane' });

      // Not an array, but looks like one.
      var names = {
        0: "Jesus",
        1: "H",
        2: "Christ",
        length: 3
      };
      var namesArray = Array.prototype.slice.call(names);
      // Now it *IS* an arry!
      //= ["Jesus", "H", "Christ"]
*/
