const db= require("../database")
const cryptojs=require('crypto-js')

async function tokengetwithid(userid){
    token=await db.query("SELECT * from tokens WHERE userid=$1"
    ,[userid]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return token.rows
}

async function tokengetwithvalue(tokenvalue){
    token=await db.query("SELECT * from tokens WHERE token=$1"
    ,[tokenvalue]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return token.rows[0]
}

async function tokencreate(userid){
    const expired_at=new Date();
    expired_at.setDate(new Date().getDate() + 30);
    let random1 = (Math.random() + 1).toString(36).substring(7);
    let random2 = (Math.random() + 1).toString(36).substring(7);
    tokenvalue= cryptojs.AES.encrypt(random1,random2).toString()
    token=await db.query("INSERT INTO tokens VALUES($1,$2,$3) RETURNING *"
    ,[userid,tokenvalue,expired_at]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return token.rows[0] 
}


module.exports.gettokenwithid=tokengetwithid
module.exports.createtoken=tokencreate
module.exports.gettokenwithvalue=tokengetwithvalue