const mysql=require('mysql');
const path=require('path');
const express = require("express");
const bodyParser =require("body-parser");
const connection=require("./connections");
const cookieParser=require("cookie-parser");
const app=express();
const authenticate=require("./routes/authentication");
const pages=require("./routes/allPages");
const profile=require("./routes/allProfile");
app.set('view engine','ejs');
require("dotenv").config();
const publicDirectory= path.join(__dirname,'./public');
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use("/",pages);
app.use("/auth",authenticate);
app.use("/page",profile);
app.listen(3000,function()
{
    console.log("yeah listening");
});
