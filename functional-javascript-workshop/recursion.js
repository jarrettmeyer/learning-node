var getDependencies = function (tree) {

  var result = [];

  function getDependenciesInternal(dependencies, depth) {
    if (dependencies) {
      var keys = Object.keys(dependencies);
      //console.log("keys:", keys);
      keys.forEach(function (key, index) {
        var dependency = dependencies[key];
        //var dependency = dependencies[key];
        var name = key + "@" + dependency.version;
        if (result.indexOf(name) < 0) {
          result.push(key + "@" + dependency.version);
        }
        getDependenciesInternal(dependency.dependencies, depth + 1);
      });
    }
  }

  getDependenciesInternal(tree.dependencies, 0);

  return result.sort();
};


module.exports = getDependencies;
