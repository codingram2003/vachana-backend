const express = require("express");
var cron = require('node-cron');
var mysql = require('mysql');
const https = require('https');
var result = []

const dataFetch = async () => {
  const response =  fetch('https://vachana-backend.onrender.com/api');
  response.then(res =>
    res.json()).then(d => {
      console.log('here')
    })
};
  cron.schedule('0 */10 * * * *', function() {
    console.log('here');
    dataFetch();

  });

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
    result=results
    
  }
  
});

  connection.end();
}

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/api", (req, res)=> {
  console.log('got till here');
    send();
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    res.json(result);
});

app.post("/", (req, res) => {
  res.send('successfully pinged!!');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
