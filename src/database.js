require('dotenv').config();
const { Pool, Client } = require('pg')

const pool=new Pool(
    {
        user:process.env.user,
        password:process.env.password,
        database:process.env.database,
        host:process.env.host,
        port:process.env.dbport
    }
)
module.exports={
    query:(text,params)=>pool.query(text,params),
}