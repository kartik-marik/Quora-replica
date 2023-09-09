const express=require("express");
const app=express();
const port=8080;
const {v4:uuidv4}=require('uuid');
var methodOverride = require('method-override');

uuidv4();
app.use(methodOverride('_method'));
app.use(express.urlencoded({extended:true}));
const path=require("path");
app.set("view engine","ejs");
app.set("views",path.join(__dirname,"views"));
app.use(express.static(path.join(__dirname,"public")));

let posts=[
    {
        id:uuidv4(),
        username:"apnacollege",
        content:"i love coding",
    },

    {
        id:uuidv4(),
        username:"kartik marik",
        content:"hard work is important to achieve success",
    },

    {
        id:uuidv4(),
        username:"rahul kumar",
        content:"i got selected for my ist internship",
    },
];

app.get("/posts",(req,res)=>{
    res.render("index.ejs",{posts});
});

app.get("/posts/new",(req,res)=>{
    res.render("new.ejs");
});


app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=> id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    // console.log(id);
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    // console.log(newcontent);
    // console.log(post);
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});


app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts= posts.filter((p)=>id!==p.id);
    // res.send("delete success");
    res.redirect("/posts");
});
app.post("/posts",(req,res)=>{
    let {username, content}=req.body;
    let id=uuidv4();
    posts.push({id, username,content});
    // console.log(req.body);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log("listening to 8080");
});