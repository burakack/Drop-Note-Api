const db= require("../database")
const cryptojs=require('crypto-js')

async function usergetwithnickname(nickname){
    user=await db.query("SELECT * from users WHERE nickname=$1",[nickname]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    if (user.rowCount!=0)
        return user.rows[0]
    else
        return {message:"User not found nickname"}
}

async function usergetwithemail(email){
    user=await db.query("SELECT * from users WHERE email=$1",[email]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    if(user.rowCount!=0)
        return user.rows[0]
    else
        return {message:"User not found emailc"}
}

async function usergetwithid(id){
    user=await db.query("SELECT * from users WHERE id=$1",[id]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    if(user.rowCount!=0)
        return user.rows[0]
    else
        return {message:"User not found id"}
     
}

async function usercreate(nickname,email,password){
    var date=await db.query("SELECT NOW()");
    var password_salt = Math.random().toString(36).substring(2,20)+date.rows[0].now.toString().substring(20,25);
    var password_hash=cryptojs.AES.encrypt(password,password_salt).toString()
    user= await db.query("INSERT INTO users (nickname,email,password_salt,password_hash,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *"
      ,[nickname,email,password_salt,password_hash,date.rows[0].now]
      ,(err,res)=>
    {
        console.log(err, res.rows[0])
    })
    return user.rows[0] 
}
async function userdelete(id)
{
    var date=await db.query("SELECT NOW()");
    var user=await db.query("UPDATE users SET deleted_at=$1 WHERE id=$2 RETURNING * ;"
    ,[date.rows[0].now,id]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return user.rows[0];
}

async function userchangepassword(password,id)
{
    var date=await db.query("SELECT NOW()");
    var password_salt = Math.random().toString(36).substring(2,20);
    var password_hash=cryptojs.AES.encrypt(password,date.rows[0].now.toString()+password_salt).toString()
    user= await db.query("UPDATE SET password_salt=$1,password_hash=$2,updated_at=$3 WHERE id=$4 RETURNING *"
      ,[password_salt,password_hash,date.rows[0].now,id]
      ,(err,res)=>
    {
        console.log(err, res.rows[0])
    })
    return user.rows[0] 
}

module.exports.getuserwithid=usergetwithid
module.exports.getuserwithemail=usergetwithemail
module.exports.getuserwithnickname=usergetwithnickname
module.exports.createuser=usercreate
module.exports.deleteuser=userdelete
module.exports.changepassworduser=userchangepassword