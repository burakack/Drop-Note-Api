const tokenservice=require('../services/tokens')

const authentication=async function(req,res,next){
    tokenn= await tokenservice.gettokenwithvalue(req.headers.access_token)
    if(tokenn==undefined)
        res.send(401,{message:"You must be logged in for this action "})
    else
    {
        req.body.userid=tokenn.userid
        next()
    }
}
module.exports.authenticationmid=authentication