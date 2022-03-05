const express = require('express');
const app = express()
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const Task = require('./model/todo');
const methodOverride = require('method-override');

mongoose.connect('mongodb://localhost:27017/todos')

app.use(methodOverride('_method'))
app.use(express.static("public"))
app.use(bodyParser.urlencoded({extended: false}))

app.set("views","./views")
app.set("view engine","ejs")


app.get("/",async (req,res)=>{
   
    const tasks = await Task.find()
    //console.log(tasks);
    res.render("home.ejs",{tasks})
})

app.post("/todo/add",async (req,res)=>{
    //console.log(req.body);
    const task = await Task.create({
        task: req.body.task
    })
    //console.log(task);
    res.redirect("/")
})

app.put("/todo/:id/complete",async (req,res)=>{
    await Task.updateOne({_id:req.params.id},{complete:true})
    console.log("mark complete");
    res.redirect("/")
})

app.delete("/todo/:id/delete", async(req,res)=>{
    await Task.deleteOne({_id:req.params.id})
    console.log("deleted");
    res.redirect("/")
})

app.listen(5000,()=>console.log("serve is listening"))