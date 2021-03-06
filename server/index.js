const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);
const exec = require('child_process').exec;
const xhub = require('express-x-hub');
require('dotenv').config();

app.use(express.static(path.join(__dirname, '/../build')));
app.use(xhub({ algorithm: 'sha1', secret: process.env.SECRET_TOKEN}));

count = 0;

io.sockets.on('connection', (socket) => {
    
    count++
    socket.on('join', (room) => {

        console.log('joined room ', room)
        
        socket.join(room)
        
        console.log(count)
        io.in(room).emit("user_count", count)
        
    })

    socket.on("message", (bulb) => {
        io.emit("update_bulb", bulb);
    })
    
    socket.on('disconnect', () => {
        --count
        io.in('lightbulb').emit("user_count", count)
        io.emit("user_count", count)
        console.log('user disconnected')
    })
})


//used for github webhook to run git pull and npm run build

app.post('/sockets_and_bulbs_hook', (req, res) => {
  
    console.log(req.isXHub && req.isXHubValid())
    
    if(req.isXHub && req.isXHubValid()){
      exec('./pull_and_build.sh', (err, stdout, stderr)=> {
          if(err){
              console.log(err)
          }else{
              console.log(stdout)
          }
      })
      console.log('success');
      res.json({ success: 'X-Hub Is Valid' });  
    } else {
      console.log('failed')
      res.status(400).json({ error: 'X-Hub Is Invalid' });
    }     
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

server.listen(4002, () => console.log('listening on port 4002'));
