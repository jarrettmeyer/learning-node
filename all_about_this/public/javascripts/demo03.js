var Speaker = (function () {

  function Speaker(options) {
    this.settings = options;
    this.name = options.name;
    this.bindEvents();
  }

  Speaker.prototype.bindEvents = function () {
    $(this.settings.button).on("click", function () {
      // This line will fail because 'this' will be the button
      // element when the callback fires.
      this.sayHello();
    });
  };

  Speaker.prototype.sayHello = function () {
    alert(this.name + ' said, "Hello."');
  };

  return Speaker;

}).call(this);

var speaker = new Speaker({
  name: "Billy",
  button: "#my-button"
});
