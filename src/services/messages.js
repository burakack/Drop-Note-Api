const db =require('../database')

async function createmessages(userid,to,message)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("INSERT INTO messages (fromuser,touser,messages,created_at) VALUES ($1,$2,$3,$4) RETURNING *;"
    ,[userid,to,message,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}
async function getmessages(userid,to)
{
    var note=await db.query('SELECT * FROM messages WHERE fromuser=$1 AND touser=$2'
    ,[userid,to]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }   
    });
    return note.rows
}

async function updatemessages(userid,id,message)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("UPDATE messages SET messages=$1,updated_at=$2 WHERE id=$3 AND fromuser=$4  RETURNING *;"
    ,[message,date.rows[0].now,id,userid]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}

async function deletemessages(userid,id)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("UPDATE messages SET deleted_at=$2 WHERE id=$1 AND fromuser=$3 RETURNING *;"
    ,[id,date.rows[0].now,userid]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}

module.exports={
    createmessages,
    getmessages,
    deletemessages,
    updatemessages
}