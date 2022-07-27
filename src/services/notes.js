const db= require("../database")
const userservice=require("../services/users")

async function createnote(userid,title,notetext,isanonymus)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("INSERT INTO notes (userid,title,notetext,is_anonymus,created_at) VALUES ($1,$2,$3,$4,$5) RETURNING *;"
    ,[userid,title,notetext,isanonymus,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0]
}

async function updatenote(id,title,notetext,isanonymus)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("UPDATE notes SET notetext=$3,is_anonymus=$4,updated_at=$5 WHERE id=$1 AND title=$2 RETURNING * ;"
    ,[id,title,notetext,isanonymus,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows[0];
}
async function deletenote(userid,title)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("UPDATE notes SET deleted_at=$3 WHERE userid=$1 AND title=$2 RETURNING * ;"
    ,[userid,title,date.rows[0].now]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
        else{
            console.log(note.rows[0])
        }
    });
    return note.rows[0]
}
async function getnotebytitle(title)
{
    var note=await db.query('SELECT userid, nickname,title,notetext,is_anonymus,likecount,dislikecount,notes.created_at,notes.updated_at,notes.deleted_at FROM notes INNER JOIN users ON notes.userid=users.id WHERE title=$1'
    ,[title]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }   
    });
    return note.rows
}
async function getnotebyuserid(userid)
{
    var date=await db.query("SELECT NOW()");
    var note=await db.query("SELECT * FROM notes WHERE userid=$1"
    ,[userid]
    ,(err,res)=>{
        if(err){
            console.log(err);
        }
    });
    return note.rows
}

async function getnotebynickname(nickname)
{
    user=await userservice.getuserwithnickname(nickname);
    if(user.message!='User not found nickname'){
        var note=await db.query(`
        SELECT title,notetext,likecount,dislikecount,is_anonymus
        FROM users
        INNER JOIN notes
        ON users.id = notes.userid WHERE nickname=$1;
        `
        ,[nickname]
        ,(err,res)=>{
            if(err){
                console.log(err);
            }}
        );
        return note.rows
    }
    return {message:"User not found nickname"}
    
}

module.exports={
    createnote,
    updatenote,
    deletenote,
    getnotebytitle,
    getnotebyuserid,
    getnotebynickname
}