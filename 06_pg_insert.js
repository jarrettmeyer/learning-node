// Requires
var pg = require("pg"),
    uuid = require("node-uuid").v4;

// Local variables
var database = "node_sample_dev",
    host = "localhost",
    description = process.argv.splice(2).join(" "),
    id;

console.log(" [x] Creating new task: " + description);

function completeTask(client, id) {
  var query = "update tasks set is_completed = $1 where id = $2";
  var values = [true, id];
  client.query(query, values, function (error, result) {
    if (error) {
      throw error;
    }
    console.log(" [x] Completed task " + id);
  });
}

function getConnectionString() {
  return "postgres://" + host + "/" + database;
}

// function deleteAllTasks(client, callback) {
//   client.query("delete from tasks where 1 = 1");
//   if (callback) {
//     callback();
//   }
// }

function insertTask(client, params) {
  var query = "";
  query += "insert into tasks (";
  query += "  id, description, assigned_to, is_completed";
  query += ") values ($1, $2, $3, $4)";
  id = uuid();
  var values = [id, params.description, params.assignedTo, false];
  client.query(query, values, function (error, result) {
    if (error) {
      throw error;
    }
    console.log(" [x] Insert successful: " + values[0]);
  });
}

function selectAllTasks(client) {
  var query = "select * from tasks";
  client.query(query, function (error, result) {
    if (error) {
      throw error;
    }
    console.log(" [x] Select all tasks result: " + result.rowCount);
    for (var i = 0, len = result.rowCount; i < len; i += 1) {
      console.log("     Row: " + i);
      console.log("       ID: " + result.rows[i].id);
      console.log("       Description: " + result.rows[i].description);
      console.log("       Assigned To: " + result.rows[i].assigned_to);
      console.log("       Is Completed: " + result.rows[i].is_completed);
    }
  });
}

pg.connect(getConnectionString(), function (error, client, done) {
  console.log(" [x] Connected to database.");
  if (error) {
    throw error;
  }

  setTimeout(function () {
    insertTask(client, { description: description, assignedTo: "No one" });
  }, 250);

  setTimeout(function () {
    selectAllTasks(client);
  }, 500);

  setTimeout(function () {
    completeTask(client, id);
  }, 700);


  setTimeout(function () {
    client.end();
  }, 1000);

});