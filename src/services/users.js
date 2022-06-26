const db= require("../database")

async function userget(nickname){
    user=await db.query("SELECT * from users WHERE nickname=$1",[nickname]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return user.rows[0] 
}

async function usercreate(nickname,password){
    
}

module.exports.getuser=userget