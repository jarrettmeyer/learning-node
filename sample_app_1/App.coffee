fs = require("fs")
http = require("http")
FormParser = require("./FormParser")
Router = require("./Router")
Task = require("./models/Task")
TaskCollection = require("./models/TaskCollection")

class App
  constructor: () ->
    @router = new Router()
    @initializeRoutes()
    @datafile = "./data/tasks.json"
    @readTasksFromFile((tasks) =>
      @taskCollection = new TaskCollection(tasks)
    )

  initializeRoutes: () ->
    console.log("Initializing routes.")
    @router.match("GET /", (request, response) =>
      @router.returnContent(request, response, "./content/index.html")
    )
    @router.match("GET /javascripts/script.js", (request, response) =>
      @router.returnContent(request, response, "./content/assets/javascripts/script.js", "text/javascript")
    )
    @router.match("GET /javascripts/jquery.js", (request, response) =>
      @router.returnContent(request, response, "./content/assets/javascripts/jquery-2.0.3.min.js", "text/javascript")
    )
    @router.match("GET /javascripts/jquery-2.0.3.min.map", (request, response) =>
      @router.returnEmpty(request, response)
    )
    @router.match("GET /javascripts/knockout.js", (request, response) =>
      @router.returnContent(request, response, "./content/assets/javascripts/knockout-2.3.0.js", "text/javascript")
    )
    @router.match("GET /stylesheets/style.css", (request, response) =>
      @router.returnContent(request, response, "./content/assets/stylesheets/style.css", "text/css")
    )
    @router.match("GET /tasks", (request, response) =>
      @readTasksFromFile((tasks) =>
        @router.returnJson(request, response, tasks)
      )
    )
    @router.match("POST /tasks", (request, response) =>
      new FormParser(request).getObject((data) =>
        task = new Task(data)
        @taskCollection.add(task)
        @writeTasksToFile()
        @router.returnJson(request, response, task)
      )
    )

  readTasksFromFile: (callback) ->
    fs.readFile(@datafile, "utf8", (error, data) =>
      if error
        console.error(error)
      else
        tasks = JSON.parse(data)
        callback(tasks)
    )

  writeTasksToFile: () ->
    content = JSON.stringify(@taskCollection.tasks)
    fs.writeFile(@datafile, content, (error, data) ->
      if error
        console.error("Error when writing to file #{@datafile}: #{error}")
    )

  start: (port) ->
    @port = port
    console.log("Starting server on port #{@port}.")
    server = http.createServer((request, response) =>
      @router.onRequest(request, response)
    )
    server.listen(@port)


module.exports = App
