// const express=require("express")
// const app=express()
// const path=require("path")

// const http=require("http")
// const socketIO=require("socket.io")
// const server=http.createServer(app)
// const io=socketIO(server)




// app.set("view engine", "ejs")
// app.use(express.json())
// app.use(express.urlencoded({extended:true}))
// app.use(express.static(path.join(__dirname, "public")))



// let waitingusers=[];
// let rooms={};



// io.on("connection",function(socket)

// {

//      socket.on("join room", function()
//     {

//         console.log("u'r connected")

//         if(waitingusers.length>0)
//         {
//             let partner=waitingusers.shift()
//             const roomname=`${socket.id}-${partner.id}`
//             socket.join(roomname)
//             partner.join(roomname)
//             io.to(roomname).emit("joined",roomname)
            
//         }

//         else{
//             waitingusers.push(socket)
//         }

//     })

    


        
//     socket.on("disconnect", function()
//     {
//         let index=waitingusers.findIndex(function(waitinguser){
//             waitinguser.id===socket.id
//         })

//         waitingusers.splice(index,1)
//     })


    
//  })


 

//  app.get("/", function(req,res)
//  {
//      res.render("index")
//  })
 
 
//  app.get("/chat",function(req,res)
//  {
//      res.render("chat.ejs")
//  })
 





// server.listen(3000)


// ============================
// Backend: Express + Socket.IO
// ============================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

app.use(cors());
app.use(express.json());

// In-memory store for users (for demo purposes)
const users = {}; // userId -> socketId

io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  // Join user
  socket.on('join', (userId) => {
    users[userId] = socket.id;
    console.log(`User ${userId} joined with socket ID ${socket.id}`);
  });

  // Handle sending a message
  socket.on('sendMessage', ({ from, to, message, messageId }) => {
    const receiverSocketId = users[to];

    if (receiverSocketId) {
      io.to(receiverSocketId).emit('receiveMessage', {
        from,
        message,
        messageId
      });

      // Notify sender message delivered
      socket.emit('messageDelivered', { messageId });
    } else {
      // Receiver offline
      socket.emit('messageSent', { messageId });
    }
  });

  // Handle message seen
  socket.on('messageSeen', ({ messageId, from }) => {
    const senderSocketId = users[from];
    if (senderSocketId) {
      io.to(senderSocketId).emit('messageSeen', { messageId });
    }
  });

  // Handle disconnect
  socket.on('disconnect', () => {
    console.log('Client disconnected:', socket.id);
    for (const [userId, sockId] of Object.entries(users)) {
      if (sockId === socket.id) delete users[userId];
    }
  });
});

// Basic route
app.get('/', (req, res) => {
  res.send('Real-time Chat App Backend is Running!');
});

// Start the server
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
