// Now we start mixing responsibilities. Our Speaker class is both a
// business-y class and is interacting with the UI.
var Speaker = (function () {

  function Speaker(options) {
    this.settings = options;
    this.name = options.name;
    this.bindEvents();
  }

  Speaker.prototype.bindEvents = function () {
    $(this.settings.button).on("click", function () {
      // This line will fail because 'this' will be the button
      // element when the callback fires. Open the console to
      // see the log of the error.
      this.sayHello();
    });
  };

  Speaker.prototype.sayHello = function () {
    alert(this.name + ' said, "Hello."');
  };

  return Speaker;

}).call(this);

// Create a new Speaker instance, setting options for the name and the
// button.
var speaker = new Speaker({
  name: "Billy",
  button: "#my-button"
});

// The 'undefined is not a function' error in a common error in JavaScript.
// The error occurs on this line:
//
//    this.sayHello()
//
// The 'this' context is now the button. Since JavaScript is a dynamic language,
// you do not get an error with this.sayHello, but the button does not have a
// sayHello attribute. Therefore, sayHello is undefined. The () means to invoke
// a function, i.e. undefined(). Hence, 'undefined is not a function'.
