 var pg = require('pg')


var PGUSER = process.env.PGUSER;
var PGDATABASE = process.env.PGDATABASE;//prob
//var PGDATABASE = 'certonceeducationdemo';//prob
var config = {
  host:process.env.PGHOST,
  
  user: PGUSER, // name of the user account
  database: PGDATABASE, // name of the database
  max: 10, // max number of clients in the pool 
  
  password: process.env.PGPASSWORD,
  idleTimeoutMillis: 30000,
  port: process.env.PGPORT || 5432
}
var pool = new pg.Pool(config);
module.exports = pool;