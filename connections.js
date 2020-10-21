const mysql=require('mysql');
const express = require("express");
var mysqlConnection =mysql.createConnection({
    host:"localhost",
    port:"3306",
    user:"root",
    password:"password",
    database:"agri sales management",
    multipleStatements:true,
    insecureAuth : true
});
mysqlConnection.connect((err)=>{
if(!err){
    console.log("connection established");
}
else{
    console.log(err)
    ;
}

}

);
module.exports=mysqlConnection;

