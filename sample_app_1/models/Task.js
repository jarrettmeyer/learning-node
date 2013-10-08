var Task = function (obj) {
  var self = this;

  if (!obj) {
    obj = {};
  }

  self.description = obj.description;
  self.assignedTo = obj.assignedTo;
  self.isCompleted = obj.isCompleted;
};

module.exports = Task