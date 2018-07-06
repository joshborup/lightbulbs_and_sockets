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


clients = [];

io.sockets.on('connection', (socket) => {
    
    let inlist = clients.filter((client) => client.address == socket.handshake.address && client.userAgent ==  socket.handshake.headers['user-agent']);
   

    if(!inlist.length){
        clients.push({address: socket.handshake.address, userAgent: socket.handshake.headers['user-agent']})
    }
    setInterval(() => {

        socket.emit("user_count", clients.length);
    }, 500)
  
    socket.on("message", (bulb) => {
        io.emit("update_bulb", bulb);
    })
    console.log(inlist)
    socket.on('disconnect', () => {
        clients = clients.filter((client) => client.address == socket.handshake.address && client.userAgent ==  socket.handshake.headers['user-agent']);
        io.emit("user_count", clients.length)
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
