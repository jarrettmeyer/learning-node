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

var speaker = new Speaker("Jimmy");
$("#my-button").on("click", function () {
  speaker.sayHello();
});
