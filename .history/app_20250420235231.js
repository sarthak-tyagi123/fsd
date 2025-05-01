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




app.get("/", function(req,res)
{
    res.render("index")
})


app.get("/chat",function(req,res)
{
    res.render("chat.ejs")
})


io.on("connection",function(socket)
{
    s)

 })














server.listen(3000)