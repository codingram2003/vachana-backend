const express = require("express");
var cron = require('node-cron');
var mysql = require('mysql');
const https = require('https');
var result = []

  cron.schedule('* * * * * *', function() {
    console.log('here')
exports.handler = async (event, context) => {
 const url = 'https://vachana-backend.onrender.com/';

 return new Promise((resolve, reject) => {
   const req = https.get(url, (res) => {
     if (res.statusCode === 200) {
       resolve({
         statusCode: 200,
         body: 'Server pinged successfully',
       });
       console.log('done')
     } else {
       reject(
         new Error(`Server ping failed with status code: ${res.statusCode}`)
       );
     }
   });

   req.on('error', (error) => {
     reject(error);
   });

   req.end();
 });
};
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
