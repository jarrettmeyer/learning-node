(function () {
  var TaskViewModel,
      TaskCollectionViewModel,
      getTasksUrl = "/tasks",
      completeTaskUrl = "/tasks/{id}/complete",
      createTaskUrl = "/tasks",
      deleteTaskUrl = "/tasks/{id}",
      editTaskUrl = "/tasks/{id}";

  TaskViewModel = function (task) {
    var self = this;

    self.task = task || {};

    self.assignedTo = ko.observable(self.task.assignedTo);
    self.description = ko.observable(self.task.description);
    self.id = ko.observable(self.task.id);
    self.isCompleted = ko.observable(self.task.isCompleted);

    self.allowDelete = ko.computed(function () {
      return (!window.viewModel.isEditing());
    });

    self.allowEdit = ko.computed(function () {
      return (!window.viewModel.isEditing() && !self.isCompleted());
    });

    self.reset = function() {
      self.assignedTo(self.task.assignedTo);
      self.description(self.task.description);
    };

    self.taskCss = ko.computed(function () {
      if (self.isCompleted()) {
        return "task-completed";
      }
      return "task";
    });
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

    self.cancelEdit = function () {
      self.selectedTask().reset();
      self.selectedTask(null);
      self.isEditing(false);
      self.isNew(false);
    };

    self.completeTask = function (task) {
      var id = task.id();
      var url = completeTaskUrl.replace("{id}", id);
      //alert("POSTing to " + url);
      $.post(url, {}, function (result) {
        task.isCompleted(true);
      });
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

    self.deleteTask = function (task) {
      var id = task.id();
      var url = deleteTaskUrl.replace("{id}", id);
      $.ajax(url, {
        type: "DELETE",
        complete: function () {
          self.tasks.remove(task);
        }
      });
    };

    self.editTask = function (task) {
      //alert("in editTask");
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
      } else {
        self.updateTask();
      }
      self.selectedTask(null);
      self.isEditing(false);
      self.isNew(false);
      return false;
    };

    self.showAddButton = ko.computed(function () {
      return !self.isEditing();
    });

    self.updateTask = function () {
      var id = self.selectedTask().id();
      var url = editTaskUrl.replace("{id}", id);
      var data = {
        assignedTo: self.selectedTask().assignedTo(),
        description: self.selectedTask().description(),
        id: self.selectedTask().id()
      };
      $.post(url, data);
    };
  }; // TaskCollectionViewModel

  var viewModel = new TaskCollectionViewModel();
  ko.applyBindings(viewModel);
  window.viewModel = viewModel;

  $.get(getTasksUrl, function (result) {
    window.viewModel.initialize(result);
  });
})();