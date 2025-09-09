const pool = require('./database');
const format = require('pg-format');
var config = require("./config");
var jwt = require('jsonwebtoken');

async function getParentAccountIdFromId(cid)
{
  try {

     var parentCheckQuery = format(`SELECT parent_accountid from USERMASTER WHERE user_id = ${cid}`);
     var fetchcheckresult=await pool.query(parentCheckQuery);
     if (fetchcheckresult.rows && fetchcheckresult.rows.length != 0) 
     {
       if(fetchcheckresult.rows[0].parent_accountid=="0")
         return cid;
       else
         return fetchcheckresult.rows[0].parent_accountid;
     }
    }
   catch (err) {
      return 0;   
   }    
}
async function getParentProfile(cid)
{
  try {

     var parentCheckQuery = format(`SELECT organization_name,organization_url,blockchain,business_is_verified, organization_verify_uri from USERMASTER WHERE user_id = ${cid}`);
     var fetchcheckresult=await pool.query(parentCheckQuery);
     if (fetchcheckresult.rows && fetchcheckresult.rows.length != 0) 
     {
       return fetchcheckresult.rows[0];
     }
     else return null;
    }
   catch (err) {
      return 0;   
   }    
}
module.exports = function(req,res,next)
{

     //console.log(req.headers.authorization)

    if(req.headers)
    {

        if(req.headers.authorization)
        { 

            var Str = req.headers.authorization;
            
            var token = Str.split(" ");
            //var decoded = jwt.verify(token[1], config.SECRET);
            //console.log("decoded:",decoded)
            if(token.length == 2)
            {

                jwt.verify(token[1], config.SECRET, async function (err, decoded) {
                    if(err)
                    {
                        var obj = {
                            Status: 401,
                            message:"Please signin again.",
                        } 
                        res.json(obj)
                    }
                    else{
                        req.user = decoded;
                        var puserid=await getParentAccountIdFromId(req.user.user_id); 
                        var pprofile=await getParentProfile(puserid);
                        if(pprofile==null)
                        {
                            return done(null, false,req.flash('loginMessage','There is no parent user.'));
                        }
                        
                        req.user.organization_name=pprofile.organization_name;
                        req.user.organization_url=pprofile.organization_url;
                        req.user.blockchain=pprofile.blockchain;
                        req.user.organization_verify_uri=pprofile.organization_verify_uri;
                        
                        console.log("user ------------------------------ ");
                        console.log("user = userid = : ", decoded?.user_id);
                        console.log("user = email = : ", decoded?.email);
                        next()
                        
                        /*
                        var ageQuery = format(`select * from usermaster where user_id = ${req.user.user_id} LIMIT 1`);
                        pool.query(ageQuery, function (err, result) {
                        if (err) {
                            var obj = {
                            Status: 401,
                            message:"Please signin again.",
                            } 
                            res.json(obj)
                        }
                        else {
                            var userData = {};
                            if (result.rows && result.rows.length != 0) {
                            userData = result.rows[0];
                            req.user.blockchain=userData.blockchain;
                            }
                            console.log("decoded:",decoded)
                            next()
                          }
                        });
                        */ 
                    }
             
                });
            }
            else{
                var obj = {
                    Status: 401,
                    message:"Unauthorized (Missing code)",
                }
            
                res.json(obj)
            }

        
        }
        else{
            var obj = {
                Status: 401,
                message:"Please signin again.",
            }
        
            res.json(obj)
        }

    }
    else{
        var obj = {
            Status: 401,
            message:"Please signin again.",
        }
    
        res.json(obj)
    }
   

}