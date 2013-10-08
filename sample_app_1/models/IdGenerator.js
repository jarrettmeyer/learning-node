var IdGenerator;

IdGenerator = function() {
  var self = this;

  self.chars = "abcdefghijklmnopqrstuvwxyz0123456789";
  self.numChars = self.chars.length;
  self.idLength = 16;

  self.getNextChar = function () {
    var index = Math.floor(Math.random() * self.numChars);
    return self.chars[index];
  };

  self.nextId = function () {
    var id, i, len;
    id = "";
    for (i = 0; i < self.idLength; i += 1) {
      id += self.getNextChar();
    }
    return id;
  };
}

module.exports = IdGenerator;

// class IdGenerator
//   constructor: () ->
//     @chars = "abcdefghijklmnopqrstuvwxyz0123456789"
//     @numChars = @chars.length
//     @length = 16
//   nextId: () ->
//     id = ""
//     for i in [1..@length]
//       id += @getNextChar()
//     id
//   getNextChar: () ->
//     index = Math.floor(Math.random() * @numChars)
//     @chars[index]
//
//module.exports = IdGenerator