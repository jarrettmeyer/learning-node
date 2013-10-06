IdGenerator = require("./IdGenerator")
Task = require("./Task")

class TaskCollection
  constructor: (tasks) ->
    @tasks = tasks || {}
    @idGenerator = new IdGenerator()

  add: (task) ->
    task.id = @idGenerator.nextId() unless task.id
    @tasks[task.id] = task

  get: (id) ->
    task = @tasks[id]

module.exports = Task