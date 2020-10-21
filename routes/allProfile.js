const express=require("express");
const app =express.Router();
const connection=require("../connections");
app.get("/main",function(req,res){
    res.render("userpage");
})
module.exports=app;