// Define the Speaker object.
var Speaker = (function () {
  "use strict";

  function Speaker(name) {
    this.name = name;
  }

  Speaker.prototype.sayHello = function () {
    alert(this.name + ' says, "Hello."');
  };

  return Speaker;
}).call(this);


// Create a new instance of Speaker. When the button is clicked, say hello.
var speaker = new Speaker("Jimmy");
$("#my-button").on("click", function () {
  speaker.sayHello();
});
