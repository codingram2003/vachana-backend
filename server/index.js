const express = require("express");
var mysql = require('mysql');
var result = []



function send() {
  var connection = mysql.createConnection({
  host     : 'db4free.net',
  user     : 'root2003',
  password : 'root2003',
  port     : '3306'
});
  connection.connect(function(err) {
  if (err) {
    console.error('Database connection failed: ' + err.stack);
    return;
  }

  console.log('Connected to database.');
});

connection.query('SELECT * FROM demo_database.transcripts', (error, results, fields) => {
  if (error) {
    return console.error(error.message);
  } else {
    console.log(results);
    result=results
    console.log(result[0])
    
  }
  
});

  connection.end();
}




const PORT = process.env.PORT || 3001;

const app = express();

app.get("/api", (req, res)=> {
    send();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json(result);
    console.log('recieved')
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});