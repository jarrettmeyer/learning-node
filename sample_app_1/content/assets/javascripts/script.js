(function () {
  var TaskViewModel,
      TaskCollectionViewModel,
      getTasksUrl = "/tasks",
      createTaskUrl = "/tasks";

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

    self.tasks = ko.observableArray([]);
    self.selectedTask = ko.observable();
    self.isEditing = ko.observable(false);
    self.isNew = ko.observable(false);

    self.allowEdit = ko.computed(function () {
      return !self.isEditing();
    });

    self.addTask = function () {
      self.selectedTask(new TaskViewModel());
      self.isEditing(true);
      self.isNew(true);
    };

    self.createTask = function () {
      var data = {
        description: self.selectedTask().description(),
        assignedTo: self.selectedTask().assignedTo()
      };
      $.post(createTaskUrl, data, function (result) {
        var taskViewModel = new TaskViewModel(result);
        self.tasks.push(taskViewModel);
      });
    };

    self.editTask = function (task) {
      alert("in editTask");
      self.selectedTask(task);
      self.isEditing(true);
      self.isNew(false);
    };

    self.initialize = function (tasks) {
      var keys = Object.keys(tasks);
      for (var i = 0, len = keys.length; i < len; i += 1) {
        var key = keys[i];
        var task = tasks[key];
        var taskViewModel = new TaskViewModel(task);
        self.tasks.push(taskViewModel);
      }
    };

    self.saveTask = function () {
      if (self.isNew()) {
        self.createTask();
      }
      self.selectedTask(null);
      self.isEditing(false);
      self.isNew(false);
      return false;
    };

    self.showAddButton = ko.computed(function () {
      return !self.isEditing();
    });
  }; // TaskCollectionViewModel

  var viewModel = new TaskCollectionViewModel();
  ko.applyBindings(viewModel);
  window.viewModel = viewModel;

  $.get(getTasksUrl, function (result) {
    window.viewModel.initialize(result);
  });
})();