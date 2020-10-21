const express=require("express");
const app =express.Router();
const connection=require("../connections");
var message =" ";
const jwt=require("jsonwebtoken");
const bcrypt=require("bcryptjs");
app.post("/register",function(req,res){
    const {firstName,LastName,email,password,mobilenumber}=req.body;
    connection.query("SELECT email from authentication where email =?",[email],  async (err,result)=>{
      
        try{
         if(result.length != 0){
            message= "email is already registered";
            console.log("yeah problem is here");
            return  res.render("register",{MESSAGE:message});

        }
        const hashing = await  bcrypt.hash(password,5);
    connection.query("INSERT into authentication SET?",{name:req.body.firstName,email:email,password:hashing,lastname:req.body.lastName},(err,result)=>{
        if(err){
            console.log(err);
            res.render("register",{MESSAGE:"there is a problem in registering try after some time"});
        }
        if(result){
            console.log(result);
            res.render("login",{message:" "});
        }
    })}
    catch(err){
        console.log(err);
    }

    }) 
});
app.post("/login",function(req,res){
const {email, password} =req.body;
connection.query('SELECT * From authentication where email=?',[email], async(err,result)=> {
try{
    if(!result || !( await bcrypt.compare(password,result[0].password))){
    return  res.render("login",{message:"email or password is incorrect"});
    }
    else{
       const  id=result[0].id;
       const token = jwt.sign({id:id},process.env.JWT_SECRET,{
           expiresIn:"90d"
       });
       console.log(token);
       const cookieOptions={
           expires:new Date(
               Date.now() + (90 *24*60*60) 
           ),
           httpOnly:true
       }
       res.cookie('jwet',token,cookieOptions);
       res.status(200).redirect("/page /main");
    }

}catch(err){
    console.log(err);
}
})
});
module.exports=app;