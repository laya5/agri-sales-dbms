const express=require("express");
const app =express.Router();
const connection=require("../connections");
app.get("/main",function(req,res){
    connection.query("select * from users_image",function(err,results){
        if(err){
            console.log(err);
            res.render("userpage",{item:[]})
        }
        else{
            console.log("here is your result");
   res.render("userpage",{item:results})}
        })
});
module.exports=app;