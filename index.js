const express = require("express");
var cron = require('node-cron');
var mysql = require('mysql');
const https = require('https');
const createClient = require('@supabase/supabase-js')
var result = []

const supabase = createClient.createClient(
  "https://qmitfmhyxrdhvfhggjzj.supabase.co",
  'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InFtaXRmbWh5eHJkaHZmaGdnanpqIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTA5Nzc0MDYsImV4cCI6MjAwNjU1MzQwNn0.hcXJdGYSFJJwTUWbMKbkp7QCZSkV1EDBFxEzGucWWjo',
  {auth: { persistSession: false }}   

);

const PORT = process.env.PORT || 3001;

const app = express();


app.get("/guests", async(req, res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { data, error } = await supabase
                                   .from('Guests')
                                   .select()
    res.json(data);
});

app.get("/team", async(req, res)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  const { data, error } = await supabase
                                 .from('Team')
                                 .select()
  res.json(data);
});

app.get("/events", async(req, res)=> {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', true);
    const { data, error } = await supabase
                                   .from('Events')
                                   .select()
    res.json(data);
    console.log(data);
});

app.get("/eventspics", async(req, res)=> {
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  res.setHeader('Access-Control-Allow-Credentials', true);
  
  const { data, error } = await supabase
.storage
.from('events')
.list('HowdyUVCE', {
  limit: 100,
  offset: 0,
  sortBy: { column: 'name', order: 'asc' },
})
  res.json(data);
  console.log(data);
});


app.post("/", (req, res) => {
  res.send('successfully pinged!!');
});

app.listen(PORT, () => {
  console.log(`Server listening on ${PORT}`);
});
