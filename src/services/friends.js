const db =require('../database')

async function createfriend(requestee_id,requester_id)
{
    var date=await db.query("SELECT NOW()");
    var friend=await db.query('INSERT INTO friends (requestee_id,requester_id,requested_on) VALUES ($1,$2,$3) RETURNING *;'
    ,[requestee_id,requester_id,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return friend.rows[0]
}

async function getfriend(userid)
{
    var friend=await db.query("SELECT requestee_id, requester_id,requested_on,Approved_on,Declined_on  FROM friends INNER JOIN users ON users.id=friends.requestee_id OR users.id=friends.requester_id WHERE users.id=$1 ;"
    ,[userid]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return friend.rows
}
async function deletefriend(requestee_id,requester_id)
{
    var friend=await db.query("UPDATE friends SET Declined_on=$3 WHERE requestee_id=$1 AND friends.requester_id=$2 RETURNING *;"
    ,[requestee_id,requester_id,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return friend.rows[0]
}



module.exports={
    getfriend,
    createfriend,
    deletefriend
}