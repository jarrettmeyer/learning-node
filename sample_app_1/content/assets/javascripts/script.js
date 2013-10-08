(function () {
  var TaskViewModel, TaskCollectionViewModel;

  TaskViewModel = function (task) {
    var self = this;
    task = task || {};

    self.assignedTo = ko.observable(task.assignedTo);
    self.description = ko.observable(task.description);
    self.id = ko.observable(task.id);
    self.isCompleted = ko.observable(task.isCompleted);

  };

  TaskCollectionViewModel = function () {
    var self = this;

    self.tasks = ko.observableArray([])
    self.selectedTask = ko.observable();

    self.initialize = function (tasks) {
      var keys = Object.keys(tasks);
      for (var i = 0, len = keys.length; i < len; i += 1) {
        var key = keys[i];
        var task = tasks[key];
        var taskViewModel = new TaskViewModel(task);
        self.tasks.push(taskViewModel);
      }
    };

  };

  var viewModel = new TaskCollectionViewModel();
  ko.applyBindings(viewModel);
  window.viewModel = viewModel;

  $.get("/tasks", function (result) {
    window.viewModel.initialize(result);
  });

})();