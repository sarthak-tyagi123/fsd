const express=require("express")
const app=express()
const path=require("path")
app.use(express.static(path.join(__dirname, 'public')));

const http=require("http")
const socketIO=require("socket.io")
const server=http.createServer(app)
const io=socketIO(server)




app.set("view engine", "ejs")
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(express.static(path.join(__dirname, "public")))







let waitingusers=[];
let rooms={};



io.on("connection",function(socket)

{

     socket.on("join room", function()
    {

        console.log("u'r connected")

        if(waitingusers.length>0)
        {
            // let partner=waitingusers.shift()

            let allUsers = [];  // The array where you want to push all the users
            allUsers.push(...waitingusers);


            // const roomname=`${socket.id}-${partner.id}`
            const roomname=`${socket.id}-${allUsers.id}`

            socket.join(roomname)
            partner.join(roomname)
            io.to(roomname).emit("joined",roomname)
            
            
        }

        else{
            waitingusers.push(socket)
        }

    })

    


    socket.on("message",function(data)
    {

    console.log(data)
    socket.broadcast.to(data.room).emit("message", data.message);

  

    })

        


    socket.on("disconnect", function()
    {
        let index=waitingusers.findIndex(function(waitinguser){
            waitinguser.id===socket.id
        })

        waitingusers.splice(index,1)
    })


    
 })


 

 app.get("/", function(req,res)
 {
     res.render("index")
 })
 



 
 app.get('/chat', (req, res) => {
    const room = req.query.room;
    res.render('chat', { room }); // chat.ejs will receive 'room'
  });
  



server.listen(process.env.PORT || 3000)


