const express=require("express");
const app=express.Router();
const connection=require("../connections");
const bcrypt=require("bcryptjs");
require("dotenv").config();
const message=" ";
/* GET REQUESTS */
app.get("/",function(req,res){
    var ok=false;
    if(req.session.userId){
        ok=true;
    }
    console.log(ok + req.session.userId);
    connection.query("select * from users_image",function(err,results){
        if(err){
            console.log(err);
            res.render("main",{ok:ok,HOME:"Failed to load this page try after some time or check your internet connection",item:[]})
        }
        else{
            console.log("here is your result");
   res.render("main",{ok:ok,HOME:"THESE ARE OUR PRODUCTS",item:results})}
        })
});
app.get("/register",function(req,res){
    res.render("register",{MESSAGE:" "});
});
app.get("/login",function(req,res){
res.render("login",{message:" "});
});

/* get REQUEST FOR WISHLIST ITEMS */
app.get("/wishlist",function(req,res){
    if(!req.session){
        console.log("you need to login first");
        return res.redirect("/login");
    }
    connection.query("SELECT * FROM wishlist where email=?",[req.session.userId],function(err,results){
        if(err){
            res.render("wishlist",{message:"sorry couldn't continue please got back to home",items:[]});
        }
        else{
            if(results.length===0){
                res.render("wishlist",{message:"YOUR WISHLIST IS EMPTY ADD SOME ITEMS",items:[]});
            }
            else{
                res.render("wishlist",{message:" ",items:results})
            }

        }
    })
});
/* get REQUEST FOR CART ITEMS */
app.get("/cart",function(req,res){
     const user = req.session.userId;
     if(!req.session ){
         return res.redirect("/login");
     }
    sql= "select * from users_image where email = '" +  user   + "'  AND ISADDEDTOCART= 1 ;" ;
    connection.query(sql,function(err,results){
        if(err){
            console.log(err);
            res.render("cartbag",{message:"there is an error while loading please try again later",items:[]})
        }
        else{
            console.log("my results=" +results);
   res.render("cartbag",{message:" ",items:results});}
        })
});
 

/*POST REQUESTS */
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
        req.session.userId=email;
        console.log(req.session);
        connection.query("select * from users_image",function(err,results){
        if(err){
            console.log(err);
            res.render("main",{ok:false,HOME:"Failed to load this page try after some time or check your internet connection",item:[]})
        }
        else{
            console.log("here is your result");
   res.render("main",{ok:true,HOME:"THESE ARE OUR PRODUCTS",item:results})}
        });
    }  
        
}
catch(err){
    console.log(err);
}
})
});
module.exports=app;
