var Speaker = (function () {

  function Speaker(options) {
    this.settings = options;
    this.name = options.name;
    this.bindEvents();
  }

  Speaker.prototype.bindEvents = function () {
    $(this.settings.button).on("click", function () {
      this.sayHello();
    }.bind(this));
    // The .bind(this) appended to the function means that the callback is
    // fixing the 'this' context to whatever it was when the method was defined.
    // It is not allowed to change.
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
