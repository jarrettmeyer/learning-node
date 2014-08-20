// Log the current value of 'this' to the console. It should be the
// Window object.
console.log("this: ", this);


// When a callback fires, demonstrate how 'this' has changed. It should
// now be the button HTML element.
$("#my-button").on("click", function () {
  console.log("this: ", this);
});

// If you come from C#, et al, you must let go of your concept of 'this' when
// working with JavaScript. In C#, the 'this' object is very clear: it is a
// reference to the current instance of the current class definition. In
// JavaScript, 'this' is a reference to the context.
