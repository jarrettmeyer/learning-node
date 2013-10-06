class Task
  constructor: (obj) ->
    obj ?= {}
    @description = obj.description
    @assignedTo = obj.assignedTo
    @isCompleted = obj.isCompleted

  complete: () ->
    @isCompleted = true

module.exports = Task