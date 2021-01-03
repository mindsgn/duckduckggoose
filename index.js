const express = require("express");
const http = require("http");
const app = express();
const server = http.createServer(app);
const socket = require("socket.io");
const io = socket(server, {origins:'*:*'});
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

  socket.on('scroll', (data) => {
    /*console.log(data.text)
    text = data.text + " ";
    textColor = 0xFBD11;
    backgroundColor = 0x000000;
    scroll();
    if(user===0){
      scroll();
    }else{
      console.log('done')
      socket.emit('done');
    }*/
    text = data.text;
    backgroundColor = data.background;
    backgroundColor = "rgba("+backgroundColor.r+","+backgroundColor.g+","+backgroundColor.b+","+backgroundColor.a+")";
    backgroundColor = rgba2hex(backgroundColor);
    textColor = data.color;
    textColor = "rgba("+textColor.r+","+textColor.g+","+textColor.b+","+textColor.a+")"
    textColor = rgba2hex(textColor);

    let history = "{"+ text + ","+ textColor +","+backgroundColor+","+new Date()+"},";
    //console.log("history", history);

    fs.writeFile('text.txt', text, (err) => {
      if (err){
        console.log(err)
      }else{
        //console.log("written");
      }
    });

    //write to
    fs.writeFile('color.txt', textColor, (err) => {
      if (err){
        console.log(err)
      }else{
        console.log("written text color");
      }
    });

    // background
    fs.writeFile('background.txt', backgroundColor, (err) => {
      if (err){
        console.log(err)
      }else{
        console.log("written background color");
      }
    });

    //append history to log
    fs.appendFileSync('history.txt', ""+history+"", (err) => {
      if (err){
        console.log(err)
      }else{
        //console.log("written history");
      }
    });
  });

  socket.on('all-off', () => {
    off();
  });

  socket.on('all-on', () => {
    allon();
  });

  socket.on("disconnected", function () {
    console.log("user disconnected");
    user --;
  });
});

server.listen(port, (error) => console.log(`Server up and running on port ${port}!`));

let color_ = "rgba(255,255,255,1)";
let background_ = "rgba(0,0,0,0)";
color_ = rgba2hex(color_);
background_ = rgba2hex(background_);

//write to text
fs.writeFile('text.txt', text, (err) => {
  if (err){
    //throw err;
    console.log(err)
  }else{
    console.log("written");
  }
});


//write to
fs.writeFile('color.txt', color_, (err) => {
  if (err){
    console.log(err)
  }else{
    console.log("written text color");
  }
});

// background
fs.writeFile('background.txt', background_, (err) => {
  if (err){
    console.log(err)
  }else{
    console.log("written background color");
  }
});
