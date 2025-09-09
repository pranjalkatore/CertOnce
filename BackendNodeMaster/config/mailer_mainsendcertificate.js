const pool = require('./database');
const format = require('pg-format');

var fs = require('fs');  
var path = require('path');
const  exec  = require('child_process').exec;

function os_func() {    
   //*
    this.execCommand = function (cmd) {
        return new Promise((resolve, reject)=> {
           exec(cmd, (error, stdout, stderr) => {
             if (error) {
                reject(error);
                return;
            }
            resolve(stdout)
           });
       })
   }
   //*/
}
module.exports =async(content,sub,to,account,attachmentjsonfile="",attachmentpdffile="",attachment_filename="certificate",logfilename="/home/ubuntu/logs/default.log", cohorttablename, studentid) => {
    
    var today = new Date();
    var dd = String(today.getDate()).padStart(2, '0');
    var mm = String(today.getMonth() + 1).padStart(2, '0'); //January is 0!
    var yyyy = today.getFullYear();
    today = dd + "/" + mm + "/"+ yyyy;

    const { google } = require("googleapis");
    const OAuth2 = google.auth.OAuth2;
    var nodemailer = require('nodemailer');
    
    var transporter;
    var from=account['from'];
    var cc = account['cc'];
    var host='';
    var port='';
    var username='';
    var password='';
    if(account['type']==true){
        console.log("here is smtp type true");
        if(account['clientid']==""||account['clientid']==null||account['clientsecret']==""||account['clientsecret']==null||
        account['refreshtoken']==""||account['refreshtoken']==null||account['username']==""||account['username']==null){
            const oauth2Client = new OAuth2(
                process.env.GMAIL_CLIENT_ID, // ClientID
                process.env.GMAIL_CLIENT_SECRET, // Client Secret
                process.env.GMAIL_REDIRECT_URL// Redirect URL
            );
            oauth2Client.setCredentials({
                refresh_token: process.env.GMAIL_REFRESH_TOKEN
            });
            const accessToken = await oauth2Client.getAccessToken();
            transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                     type: "OAuth2",
                     user: 'admin@certonce.com', 
                     clientId: process.env.GMAIL_CLIENT_ID,
                     clientSecret: process.env.GMAIL_CLIENT_SECRET,
                     refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                     accessToken: accessToken
                }
            });
            //from = 'admin@certonce.com';
        }
        else{
            const oauth2Client = new OAuth2(
                account['clientid'], // ClientID
                account['clientsecret'], // Client Secret
                "https://developers.google.com/oauthplayground" // Redirect URL
            );
            oauth2Client.setCredentials({
                refresh_token: account['refreshtoken']
            });
            const accessToken = await oauth2Client.getAccessToken();
            transporter = nodemailer.createTransport({
                service: "gmail",
                auth: {
                     type: "OAuth2",
                     user: account['username'], 
                     clientId: account['clientid'],
                     clientSecret: account['clientsecret'],
                     refreshToken: account['refreshtoken'],
                     accessToken: accessToken
                }
            });
            //if(account['from']=="" ||account['from']==null) from='admin@certonce.com';
        }
    }
    else if(account['type']==false)
    {
        console.log("here is smtp type false");
        if(account['host']==""||account['host']==null||account['port']==""||account['port']==null||account['username']==""||account['username']==null)
        {
            host='smtp.gmail.com';
            port='465';
            username=process.env.SMTP_USER;
            password=process.env.SMTP_PASS;
        }
        else
        {
            host=account['host'];
            port=account['port'];
            username=account['username'] ;
            password=account['password'];
        }
        const domain = username.split('@')[1];

        //if(account['from']=="" ||account['from']==null) from=username;
        //cc="info@enhelion.com";
        //to="om@growthschool.io";
        //to="ranjanemail@gmail.com";
        var sgTransport = require('nodemailer-sendgrid-transport');  
        var sendgridoptions = {
            auth: {
            //api_user: username,
            api_key: password
            }
        }  
        transporter = nodemailer.createTransport({

            host: host,
            port: port,
            //secure: true,        
            secureConnection: false,
            pool: true,
            auth: {
                user: username,
                pass: password
            },
            tls: {
                ciphers:'SSLv3'
            },
            name: domain
            
        });
        
        if(host==="smtp.sendgrid.net")
        {
            transporter = nodemailer.createTransport(sgTransport(sendgridoptions));
        }
    }

    
    
    return new Promise(async (resolve,reject)=>{
        if(from=="" ||from==null) from='admin@certonce.com';        
        if(attachment_filename=="") attachment_filename="certificate";
        var jsonattachmentfilename=attachment_filename;
        if(attachmentjsonfile.indexOf(".png")!==-1 || attachmentjsonfile.indexOf(".PNG")!==-1) jsonattachmentfilename=jsonattachmentfilename+".png";
        else jsonattachmentfilename=jsonattachmentfilename+".json";

        var mailOptions = {
            from: from,
            to: to,
            cc: cc,
            subject: sub,
            html: content
        };

        if(attachmentpdffile!==""&&attachmentjsonfile!=="")
        {
            mailOptions = {
            from: from,
            to: to,
            cc: cc,
            subject: sub,
            html: content,
            attachments:[{path:attachmentjsonfile,filename:jsonattachmentfilename},{path:attachmentpdffile,filename:attachment_filename+".pdf"}]
        };
        }
        else if(attachmentpdffile!==""&&attachmentjsonfile=="")
        {
            mailOptions = {
            from: from,
            to: to,
            cc: cc,
            subject: sub,
            html: content,
            attachments:[{path:attachmentpdffile,filename:attachment_filename+".pdf"}]
        };
        }
        else if(attachmentpdffile==""&&attachmentjsonfile!=="")
        {
            mailOptions = {
            from: from,
            to: to,
            cc: cc,
            subject: sub,
            html: content,
            attachments:[{path:attachmentjsonfile,filename:jsonattachmentfilename}]
        };
        }
        
        transporter.sendMail(mailOptions,async function (error, info) {
            if (error) {
                console.log(error);
                var logdirpath = path.dirname(logfilename);
                var os = new os_func();            
                if (!await fs.existsSync(logdirpath))
                {
                    await os.execCommand('sudo mkdir -p "'+logdirpath+'"');
                    await os.execCommand('sudo chmod -R 777 "'+logdirpath+'"');
                }
                var logStream = fs.createWriteStream(logfilename, {flags: 'a'});  

                let date_ob = new Date();
                // current date
                // adjust 0 before single digit date
                let date = ("0" + date_ob.getDate()).slice(-2);

                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                // current year
                let year = date_ob.getFullYear();

                // current hours
                let hours = date_ob.getHours();

                // current minutes
                let minutes = date_ob.getMinutes();
                // current seconds
                let seconds = date_ob.getSeconds();

                logStream.write("Fail "+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+" from "+from+" to "+to+" cc "+cc+"\n");
                logStream.end();

                //let updatesql= format(`UPDATE ${cohorttablename} SET certificatesent = false  WHERE id=${studentid}`);                                                      
                let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 3  WHERE id=${studentid}`);
                await pool.query(updatesql);

                resolve(false);
            } else {
                console.log('Email sent: ' + info.response);
                var logdirpath = path.dirname(logfilename);
                var os = new os_func();            
                if (!await fs.existsSync(logdirpath))
                {
                    await os.execCommand('sudo mkdir -p "'+logdirpath+'"');
                    await os.execCommand('sudo chmod -R 777 "'+logdirpath+'"');
                }
                var logStream = fs.createWriteStream(logfilename, {flags: 'a'});   
                let date_ob = new Date();
                // current date
                // adjust 0 before single digit date
                let date = ("0" + date_ob.getDate()).slice(-2);

                // current month
                let month = ("0" + (date_ob.getMonth() + 1)).slice(-2);

                // current year
                let year = date_ob.getFullYear();

                // current hours
                let hours = date_ob.getHours();

                // current minutes
                let minutes = date_ob.getMinutes();
                // current seconds
                let seconds = date_ob.getSeconds();  
                logStream.write("Success "+year + "-" + month + "-" + date + " " + hours + ":" + minutes + ":" + seconds+" from "+from+" to "+to+" cc "+cc+"\n");
                logStream.end();

                //let updatesql= format(`UPDATE ${cohorttablename} SET certificatesent = true  WHERE id=${studentid}`);
                let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 2,downloaddate='${today}'  WHERE id=${studentid}`);
                await pool.query(updatesql);
                resolve(true);
            }
        });
    });
}

