const express=require("express");
const app =express.Router();
const connection=require("../connections");
app.get("/:id",function(req,res){
    var ok =false;
      const id1 = req.params.id;
    if(!req.session.userId){
       return   res.render("login",{message:" You need to login first!!"});
    }
  
    else{
        var item=[];
        connection.query("SELECT * from users_image",function(err,results){
            if(err){
                item=0;
            }
            else{
                console.log(results);
                item=results;
            }
        });
        ok=true;
       connection.query("UPDATE users_image SET ISADDEDTOCART='1' WHERE id=?",[id1],function(err,result){
        if(err){
            return res.render("main",{ok:ok,HOME:"THERE IS A PROBLEM IN ADDING ATEM TO CART PLEASE TRY AGAIN LATER!",item:item})
        }
        else{
            
            return res.render("main",{ok:ok,HOME:"ITEM SUCCESSFULLY ADDED TO CART",item:item})
        }
       })
    }
    }
    );
module.exports=app