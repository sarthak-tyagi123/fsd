const express=require("express")
const app=express()
const path=require("path")

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
        if(waitingusers.length>0)
        {
            let partner=waitingusers.shift()
            const roomname=`${socket.id}-${partner.id}`
            socket.join(roomname)
            partner.join(roomname)
            io.to(roomname).emit("joined")
        }

        else{
            waitingusers.push(socket)
        }

    })
        
 })









 app.get("/", function(req,res)
 {
     res.render("index")
 })
 
 
 app.get("/chat",function(req,res)
 {
     res.render("chat.ejs")
 })
 





server.listen(3000)