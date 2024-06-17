const express = require("express");
const http = require("http");
const path = require("path");
const { Server } = require("socket.io");


const app = express();
const server = http.createServer(app);
const io = new Server(server);

const users = {};

io.on("connection" , (socket) => {
    
    
    socket.on('new-user-joined' , name =>{
        users[socket.id] = name;
    })
    
    socket.on('send' , message => {
        let dataObj = {
            message: message ,
            name: users[socket.id]
        }

        socket.broadcast.emit('receive' , dataObj)
    })
});


app.use(express.static(path.resolve("./public")));




app.get("/" , (req , res) => {
    return res.sendFile("/public/index.html");
})

server.listen(3000 , () => {
    console.log("server started");
})