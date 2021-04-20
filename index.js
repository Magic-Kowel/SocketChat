const path = require('path');
const express = require('express');
const app = express();

//setting
app.set('port', process.env.PORT || 4500);

//static files
app.use(express.static(path.join(__dirname,'public')));


// start the server
const server = app.listen(app.get('port'),()=>{
    console.log('server on port',app.get('port'));
});

const SocketIO = require('socket.io');
const io = SocketIO(server);

//webSockets

io.on('connection',(socket) =>{
    console.log('new conexion',socket.id);
    socket.on('chat:message',(data)=>{
        io.sockets.emit('chat:message',data);
    });
    socket.on('chat:typing',(data)=>{
        socket.broadcast.emit('chat:typing',data);
    })
    
});

