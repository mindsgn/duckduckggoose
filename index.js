const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {origins:'http://banner.goodgoodgood.co.za'});
const bodyParser = require("body-parser");
const passport = require("passport");
const path = require("path");
const cors = require("cors");
const uuid = require("uuid-random");
const port = process.env.PORT || 5000;
const fs = require('fs');

let timer = null;
let config = null;
let pixels = null;
let text = 'duck duck goose! clothes etc. 120 bree street. featuring: beau beau. beautiful boys. good good good. nolusizo weavers. rich mnisi. sindiso khumalo. thebe magugu. the other records. lekker boooiii!!'+ " ";

let user = 0;

app.use(function(req, response, next) {
  response.header("Access-Control-Allow-Origin", "*");
  response.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
  next();
});

app.use(express.static(path.join(__dirname, './front/build')));

//localhost
app.get('/', function(request, response){
 	response.sendFile(path.join(__dirname+'/front/build/'));
});

//if page not found
app.get('*', function(request, response){
    response.sendFile(path.join(__dirname+'/front/build/'));
});

//socket connection
io.on("connection", (socket) => {
  console.log("new user connected");
  //add user
  user ++;

  socket.on('color-change', (data) => {
    let color = data.color;
    console.log(color)
    io.emit('update-color', {color:color})
  });

  socket.on('background-change', (data) => {
    let background = data.color;
    console.log(background)
    io.emit('update-background', {background: background})
  });

  socket.on('scroll', (data) => {
    let text = data.text;
    let background = data.background;
    let color = data.color;
    console.log(text, background, color)
    io.emit('update', {text: text, background: background, color: color})
  });

  socket.on("disconnected", function () {
    console.log("user disconnected");
  });
});

server.listen(port, (error) => console.log(`Server up and running on port ${port}!`));
