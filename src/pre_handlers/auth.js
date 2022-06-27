const tokenservice=require('../services/tokens')

const authentication=async function(req,res,next){
    var token=req.headers.access_token;
    tokenn= await tokenservice.gettokenwithvalue(token)
    if(tokenn.rowCount==0)
        res.send({message:"You must be logged in for this action "})
    else
        req.body.userid=tokenn.userid
    next()
}
module.exports.authenticationmid=authentication