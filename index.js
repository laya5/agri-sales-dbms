const mysql=require('mysql');
const path=require('path');
const express = require("express");
const bodyParser =require("body-parser");
const connection=require("./connections");
const cookieParser=require("cookie-parser");
const fileUpload =require("express-fileupload");
const app=express();
const pages=require("./routes/authentication");
const profile=require("./routes/allProfile");
const personals =require("./routes/allpersonals");
const solditems =require("./routes/solditems");
const categories=require("./routes/categories");
const logout=require("./routes/logout");
app.set('view engine','ejs');
const session=require("express-session");
const addingcart=require("./routes/addtocart");
const { unwatchFile } = require('fs');
require("dotenv").config();
const publicDirectory= path.join(__dirname,'./public');
app.use(session({
    name:'laya',
    resave:false,
    saveUninitialized:false,
    secret:process.env.SECRET,
    key:'express.sid',
    cookie:{
        maxAge:Number(process.env.SESS_LIFETIME),
        sameSite:true,
        secure:false,

    }
}));
app.use(express.static(publicDirectory));
app.use(bodyParser.urlencoded({extended: true}));
app.use(cookieParser());
app.use(fileUpload());
app.use("/",pages);
app.use("/page",profile);
app.use("/auth/pages",personals);
app.get('/myitems',solditems);
app.use("/add_cart",addingcart);
app.use("/categories",categories);
app.use("/logout",logout)

app.listen(3000,function()
{
    console.log("yeah listening");
});