var UrlParser = function (url) {
  // Variable initializations
  var self = this;
  self.url = url;

  self.getIdFromUrl = function (index) {
    console.log("Attempting to get ID from " + self.url + ".");
    if (!index) {
      index = 2;
    }
    var urlParts = self.url.split(/\//);
    return urlParts[index];
  };
};

module.exports = UrlParser;