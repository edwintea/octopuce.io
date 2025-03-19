let mysql = require('mysql2');

let connection = mysql.createPool({
    host    :   "localhost",
    port    :   "3306",
    user    :   "root",
    password :  "",
    database:   "octopuce",
    connectionLimit: 5, //mysql connection pool length 
});

// Attempt to catch disconnects 
connection.on('connection', function (connection) {
    console.log('DB Connection established');
  
    connection.on('error', function (err) {
      console.error(new Date(), 'MySQL error', err.code);
    });
    connection.on('close', function (err) {
      console.error(new Date(), 'MySQL close', err);
    });
  
  });
  

module.exports=connection;
