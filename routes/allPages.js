const express=require("express");
const app =express.Router();
const connection=require("../connections");
app.get("/",function(req,res){
   res.render("main",{HOME:"i am here"});
});
app.get("/register",function(req,res){
    res.render("register",{MESSAGE:" "});
});
app.get("/login",function(req,res){
res.render("login",{message:" "});
});
module.exports=app;