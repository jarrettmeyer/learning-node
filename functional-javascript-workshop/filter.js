function getShortMessages(messages) {
  return messages.map(function (m) {
    return m.message;
  }).filter(function (m) {
    return m.length < 50;
  });
}
module.exports = getShortMessages;
