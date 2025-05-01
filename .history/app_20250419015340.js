const express=require("express")
const app=express()
const path=require("path")
const http=require("http")

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



app.listen(3000)