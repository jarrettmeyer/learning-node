var pg = require("pg");
var database = "node_sample_dev";
var host = "localhost";

var connectionString = "postgres://" + host + "/" + database;

pg.connect(connectionString, function (error, client, done) {
  if (error) {
    console.error("Could not connect to database with connection string %s", connectionString);
    console.error(error);
    return error;
  }
  var query = "select NOW() as \"theTime\"";
  client.query(query, function (error, result) {
    if (error) {
      console.error("Error executing query %s", query);
      console.error(error);
      return error;
    }
    console.log("Server time: %s", result.rows[0].theTime);
    client.end();
  });
});