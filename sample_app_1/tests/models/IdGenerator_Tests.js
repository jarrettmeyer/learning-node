var assert, IdGenerator;

assert = require("assert");
IdGenerator = require("../../models/IdGenerator");

describe("IdGenerator", function () {
  var c,
      id,
      idGenerator = new IdGenerator();

  describe("#chars", function () {
    it("exists", function (done){
      assert.ok(idGenerator.chars);
      done();
    });
    it("has the expected length", function (done) {
      assert.equal(36, idGenerator.numChars);
      done();
    });
  });

  describe("#getNextChar", function () {
    it("returns a single alphanumeric character", function (done){
      for (var i = 0; i < 10000; i += 1) {
        c = idGenerator.getNextChar();
        assert.ok(c, "the character 'c' is not defined");
        assert.ok(c.match(/[a-z0-9]/));
      }
      done();
    });
  });

  describe("#nextId", function () {
    it("creates an ID with length 16", function (done) {
      id = idGenerator.nextId();
      assert.equal(16, id.length);
      done();
    });
    it("should match the pattern [a-z0-9]", function (done) {
      id = idGenerator.nextId();
      assert.ok(id.match(/[a-z0-9]{16}/));
      done();
    });
  })
});