const express = require('express');
const app = express();
const path = require('path');
const server = require('http').createServer(app);
const io = require('socket.io')(server);


app.use(express.static(path.join(__dirname, '/../build')));

io.sockets.on('connection', (socket) => {
    console.log('user connected')
    socket.on('room', () => {

    })

    socket.on("message", (bulb) => {
        console.log(bulb)
        io.emit("update_bulb", bulb);
    })

    socket.on('disconnect', () => {
        console.log('user disconnected')
    })
})

app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
})

server.listen(4000, () => console.log('listening on port 4000'));
