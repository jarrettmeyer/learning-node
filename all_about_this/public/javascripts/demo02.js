function writeThis() {
  console.log("this: ", this);
}

// Log the current value of 'this' to the console. It should be the
// Window object.
writeThis();

var counter = 0;

// When a callback fires, demonstrate how 'this' has changed. It should
// now be the button HTML element.
$("#my-button").on("click", function () {
  if (counter % 3 === 0) {
    // Call a function (defined above).
    writeThis();
  } else if (counter % 3 === 1) {
    // Inline function, executed immediately.
    (function () {
      console.log("this: ", this);
    })();
  } else {
    // Directly write to the console.
    console.log("this: ", this);
  }
  counter += 1;
});
