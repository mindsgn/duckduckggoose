const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {origins:'http://banner.goodgoodgood.co.za:*'});
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
let text = null;
let color = null;
let background = null;
let colorHex = null;
let backgroundHex = null;
let bannerSpeed = null;
let websiteSpeed = null;

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

  socket.on('background-change', (data) => {
    let background = data.color;
    console.log(background)
    io.emit('update-background', {background: background});
  });

  socket.on('scroll', (data) => {
    text = data.text;
    color = data.color;
    background = data.background;
    bannerSpeed = data.speed;
    websiteSpeed = data.websiteSpeed;
    colorHex = data.colorHex,
    backgroundHex = data.backgroundHex,
    console.log(data)
    io.emit('update', {text: text, background: background, color: color, speed: bannerSpeed})
  });

  socket.on('text', (data) => {
    io.emit('update_text', {text: text, background: backgroundHex, color: colorHex})
  });

  socket.on("disconnected", function () {
    console.log("user disconnected");
  });
});

server.listen(port, (error) => console.log(`Server up and running on port ${port}!`));
