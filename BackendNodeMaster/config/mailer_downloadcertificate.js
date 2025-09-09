const pool = require('./database');
const format = require('pg-format');
const qs = require('qs');
const axios = require('axios');

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
module.exports =async(content,sub,to,account,logfilename="/home/ubuntu/logs/default.log") => {
    const utils = require("../app/utils")
    // check if this is for LJKU, TODO: We should be doing it with account_id
    if(account.from === "blockchain@ljku.edu.in") {
        const mailOptions = {
            from: account.from,
            to: to,
            cc: account.cc,
            subject: sub,
            html: content
        };
        const response = await utils.sendEmailIdeaBizViaAPI(account, mailOptions);
        return response;
    }
   

    if(account['isoffice365']==undefined || account['isoffice365']==null || account['isoffice365']==0)
    {
        console.log("isoffice365=",account['isoffice365']);  
        
        const { google } = require("googleapis");
        const OAuth2 = google.auth.OAuth2;
        var nodemailer = require('nodemailer');    
        var smtpTransport = require('nodemailer-smtp-transport');
        var transporter;
        var from=account['from'];
        var cc = account['cc'];
        var host='';
        var port='';
        var username='';
        var password='';
        var result = {};        
        try {
            if(account['type']==true){
                console.log("here is smtp type true");
                if(account['clientid']==""||account['clientid']==null||account['clientsecret']==""||account['clientsecret']==null||
                account['refreshtoken']==""||account['refreshtoken']==null||account['username']==""||account['username']==null){
                    console.log("here is smtp type true --- 1");
                    const oauth2Client = new OAuth2(
                        process.env.GMAIL_CLIENT_ID, // ClientID
                        process.env.GMAIL_CLIENT_SECRET, // Client Secret
                        process.env.GMAIL_REDIRECT_URL // Redirect URL
                    );
                    oauth2Client.setCredentials({
                        refresh_token:process.env.GMAIL_REFRESH_TOKEN
                    });                
                    const accessToken = await oauth2Client.getAccessToken();
                    transporter = nodemailer.createTransport({
                        service: "gmail",
                        auth: {
                            type: "OAuth2",
                            user: process.env.GMAIL_USER, 
                            clientId: process.env.GMAIL_CLIENT_ID,
                            clientSecret: process.env.GMAIL_CLIENT_SECRET,
                            refreshToken: process.env.GMAIL_REFRESH_TOKEN,
                            accessToken: accessToken
                        }
                    });
                    //from = 'admin@certonce.com';
                }
                else{
                    console.log("here is smtp type true --- 2");
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
                console.log("######--######",host,port,username,password);
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
                else if(host.indexOf("relay")!==-1)
                {
                    transporter = nodemailer.createTransport(smtpTransport({
                        host: host,
                        port: port
                    }));
                }
            }
    
            
            
        // return new Promise(async (resolve,reject)=>{
            if(from=="" ||from==null) from='admin@certonce.com';        
            
            var mailOptions = {
                from: from,
                to: to,
                cc: cc,
                subject: sub,
                html: content
            };
            
            let info
            try {
            info = await transporter.sendMail(mailOptions);
            console.log("Email Sent Successfully")
            } catch (err) {
                console.log("ERROR ----", err);
            }
            
            console.log('Email sent: ' + info.response);
            result.status=200;
            result.message=info.response;
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
            // let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 2  WHERE id=${studentid}`);
            // await pool.query(updatesql);
        } catch (error) {
            // console.error('There was an error: ', error);
            result.status=400;
            result.message=error;
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
    
            // let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 3  WHERE id=${studentid}`);
            // await pool.query(updatesql);
        }
        return result;
    }
    else
    {
        console.log("isoffice365=",account['isoffice365']);
        var result = {};
        try
        {
            const axios = require('axios');
            
            var accesstoken = account['office365accesstoken'];
            const config = {
            headers: {
                'Authorization': `Bearer ${accesstoken}`,
                'Content-Type': 'application/json'
            }
            };

            let emailData = {
            Message: {
                Subject: sub,
                Body: {
                    ContentType: "html",
                    Content: content
                },
                ToRecipients: [
                    {
                        EmailAddress: {
                            Address: to
                        }
                    }
                ],
                Attachments: []
            },
            SaveToSentItems: "true"
            };
            
            var response=await axios.post(`https://graph.microsoft.com/v1.0/users/${account.from}/sendMail`, emailData, config)
            result.status=200;
            result.message=response.data;
            console.log('Email sent: ' + response.data);
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
        }
        catch(error)
        {
            console.log(error?.message);
            console.log(error?.response?.data);
            result.status=400;
            result.message={};
            result.message.response=error.response.data.error.message;
            console.log('Email sending has been failed');

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
        }
        return result;
    }    
    

}

// This is for LJKU
const sendEmailIdeaBizViaAPI = async (account, mailOptions) => {
    const apiUrl = 'https://emailidea.biz/api/SendEmail';
  
    const data = qs.stringify({
      ApiKey: account.password,
      To: mailOptions.to,
      From: account.from,
      ReplyTo: account.from,
      
      Subject: mailOptions.subject,
      Body: mailOptions.html
    });
  
    try {
      const response = await axios.post(apiUrl, data, {
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        }
      });
  
      console.log('Response:', response.data);
    } catch (error) {
      console.error('Error sending email:', error.response?.data || error.message);
    }
  };