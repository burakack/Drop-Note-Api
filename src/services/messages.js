const db =require('../database')

async function messagescreate(to,message)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("INSERT INTO notes (fromuser,touser,messages,created_at) VALUES ($1,$2,$3,$4) RETURNING *;"
    ,[req.body.userid,to,message,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}
async function messagesget(to)
{
    var note=await db.query('SELECT * FROM messages WHERE fromuser=$1 AND touser=$2'
    ,[req.body.userid]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }   
    });
    return note.rows
}

async function messagesupdate(id,message)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("UPDATE notes SET messages=$3,updated_at=$4 WHERE id=$5  RETURNING *;"
    ,[message,date.rows[0].now,id]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}

async function messagesdelete(id)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("UPDATE notes SET deleted_at=$2 WHERE id=$1 RETURNING *;"
    ,[req.body.userid,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}

module.exports.createmessages=messagescreate
module.exports.getmessages=messagesget
module.exports.deletemessages=messagesdelete
module.exports.updatemessages=messagesupdate