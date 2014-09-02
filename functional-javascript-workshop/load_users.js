"use strict";

module.exports = function (userIds, load, done) {
  var numberOfUserIds = userIds.length;
  var counter = 0;
  var users = new Array(numberOfUserIds);
  return userIds.forEach(function(id, index) {
    return load(id, function(user) {
      users[index] = user
      counter += 1;
      if (counter === numberOfUserIds) {
        return done(users);
      }
    })
  })
}
