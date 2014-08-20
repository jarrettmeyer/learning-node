// Another solution is to separate our concerns into two different objects. In
// this example, we create both a Speaker and SpeakerView.
var Speaker = (function () {
  function Speaker(name) {
    this.name = name;
  }
  Speaker.prototype.sayHello = function () {
    alert(this.name + ' says, "Hello."');
  }
  return Speaker;
}).call(this);

var SpeakerView = (function () {
  function SpeakerView(options) {
    bindButtonClick(options.button, options.speaker.sayHello);
  }
  function bindButtonClick(selector, callback) {
    $(selector).on('click', function () {
      callback();
    });
  };
  return SpeakerView;
}).call(this);

// Create a new instance of SpeakerView.
var speaker = new Speaker("Alice");
var speakerView = new SpeakerView({
  speaker: speaker,
  button: "#my-button"
});

/* In this example, we never rely on 'this' in the bindButtonClick function in
our SpeakerView object. The bindButtonClick function is also never exposed by
the SpeakerView class. */
