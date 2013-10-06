class IdGenerator
  constructor: () ->
    @chars = "abcdefghijklmnopqrstuvwxyz0123456789"
    @numChars = @chars.length
    @length = 16
  nextId: () ->
    id = ""
    for i in [1..@length]
      id += @getNextChar()
    id
  getNextChar: () ->
    index = Math.floor(Math.random() * @numChars)
    @chars[index]

module.exports = IdGenerator