const cv = require('opencv4nodejs');
const path = require('path');
const express = require('express');
const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);


const wCap = new cv.VideoCapture(0);
const FPS = 10;
wCap.set(cv.CAP_PROP_FRAME_HEIGHT, 640);
wCap.set(cv.CAP_PROP_FRAME_WIDTH, 480);

app.get('/', (req,res) => {
  res.sendFile(path.join(__dirname, 'index.html'))
});

setInterval(() => {
  const frame = wCap.read();
  const image = cv.imencode('.jpg', frame).toString('base64');
  io.emit('image', image);
}, 1000/FPS);

server.listen(3000);
