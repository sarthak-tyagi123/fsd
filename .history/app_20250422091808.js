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
// Backend: Express + Socket.IO with EJS Frontend
// ============================

const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const path = require('path');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server);

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Set up EJS for templating
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(express.static(path.join(__dirname, 'public')));

// In-memory store for users
const users = {}; // username -> socketId

// Routes
app.get('/', (req, res) => {
  res.render('login');
});

app.post('/chat', (req, res) => {
  const { username, peername } = req.body;
  res.render('chat', { username, peername });
});

// Socket.IO handlers
io.on('connection', (socket) => {
  console.log('New client connected:', socket.id);

  socket.on('join', (username) => {
    users[username] = socket.id;
    console.log(`${username} connected with socket ID ${socket.id}`);
  });

  socket.on('sendMessage', ({ from, to, message }) => {
    const toSocketId = users[to];

    if (toSocketId) {
      io.to(toSocketId).emit('receiveMessage', { from, message });
      socket.emit('messageDelivered');
    } else {
      socket.emit('messageSent');
    }
  });

  socket.on('disconnect', () => {
    for (const [username, id] of Object.entries(users)) {
      if (id === socket.id) {
        delete users[username];
        break;
      }
    }
    console.log('Client disconnected:', socket.id);
  });
});

// Server setup
const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
