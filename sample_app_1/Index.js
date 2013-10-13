var Index = function (router) {

  if (!router) {
    throw new Error("Undefined argument: router");
  }

  var self = this;
  self.router = router;

  var root = function (request, response) {
    self.router.returnContent(request, response, "./content/index.html");
  };

};

module.exports = Index;