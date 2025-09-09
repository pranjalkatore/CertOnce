const pool = require('./database');
const utils = require("../app/utils");
const format = require('pg-format');

const fs = require('fs');
const path = require('path');
const exec = require('child_process').exec;
const axios = require('axios');
const nodemailer = require('nodemailer');
const smtpTransport = require('nodemailer-smtp-transport');
const sgTransport = require('nodemailer-sendgrid-transport');

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
module.exports =async(content, sub, to, account, attachment_files, logfilename="/home/ubuntu/logs/default.log", cohorttablename, studentid) => {
    console.log("Mail sending with mailer_sendcertificate");
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
        
        try{
            if(account['type']==true){
                console.log("here is smtp type true sendcertificate -");
                if(account['clientid']==""||account['clientid']==null||account['clientsecret']==""||account['clientsecret']==null||
                account['refreshtoken']==""||account['refreshtoken']==null||account['username']==""||account['username']==null){
                    try {
                        const oauth2Client = new OAuth2(
                            process.env.GMAIL_CLIENT_ID, // ClientID
                            process.env.GMAIL_CLIENT_SECRET, // Client Secret
                            process.env.GMAIL_REDIRECT_URL // Redirect URL
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
                    } catch (err) {
                        console.log(" ===== - 1 ", err);
                    }
                    //from = 'admin@certonce.com';
                }
                else{
                    console.log(account);
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
                console.log("()()()()",host, port)
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
          
            if(from=="" ||from==null) from='admin@certonce.com'; 
            var mailOptions = {
                from: from,
                to: to,
                cc: cc,
                subject: sub,
                html: content
            };
            if(attachment_files!=="" && attachment_files.length>0)
            {
                mailOptions = {
                    from: from,
                    to: to,
                    cc: cc,
                    subject: sub,
                    html: content,
                    attachments:attachment_files
                };
            }
            console.log(mailOptions);
            let info = await transporter.sendMail(mailOptions);
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
            let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 2  WHERE id=${studentid}`);
            await pool.query(updatesql);
            // resolve(true);
        }
        catch(err){
             console.error('There was an error: ',err);
            
            result.status=400;
            result.message=err;

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

            // resolve(false);
        }
        return result;
    }
    else
    {
        console.log("isoffice365=",account['isoffice365']);

        let result = {};
        try {
          // ✅ Step 1: Refresh token if needed

          await utils.refreshOffice365TokenIfNeeded(account, async (newAccessToken, newRefreshToken) => {

            console.log("Query",account.id);
            await pool.query(
              `UPDATE setting SET office365accesstoken = $1, office365refreshtoken = $2 WHERE accountid = $3`,
              [newAccessToken, newRefreshToken, account.id]
            );
          });

          const accesstoken = account.office365accesstoken;
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

          if (attachment_files && attachment_files.length > 0) {
            emailData.Message.Attachments = attachment_files;
          }

          const response = await axios.post(
            `https://graph.microsoft.com/v1.0/users/${account.from}/sendMail`,
            emailData,
            config
          );
          if (response.status === 202) {
              result.status = 200;
              result.message = "Email sent successfully via Office 365.";
              console.log("Email sent successfully via Office 365.");
            } else {
              result.status = response.status;
              result.message = "Unexpected response status: " + response.status;
              console.warn("Unexpected status:", response.status);
            }

          // Log success
          await writeLog(logfilename, `Success from ${account.from} to ${to} cc ${account.cc}`);
          await pool.query(format(`UPDATE ${cohorttablename} SET certificatesendstate = 2 WHERE id = ${studentid}`));
        }
        catch(error)
        {
            console.log(error);
            console.error(error.response.data.error.message);
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

            //let updatesql= format(`UPDATE ${cohorttablename} SET certificatesent = false  WHERE id=${studentid}`);                                                      
            let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 3  WHERE id=${studentid}`);
            await pool.query(updatesql);
        }
        return result;    
    }
    
};
// ✅ Helper for logging
async function writeLog(logfilename, message) {
  const logdirpath = path.dirname(logfilename);
  const os = new os_func();
  if (!fs.existsSync(logdirpath)) {
    await os.execCommand(`sudo mkdir -p "${logdirpath}"`);
    await os.execCommand(`sudo chmod -R 777 "${logdirpath}"`);
  }

  const logStream = fs.createWriteStream(logfilename, { flags: 'a' });
  const now = new Date();
  const timestamp = `${now.getFullYear()}-${pad(now.getMonth() + 1)}-${pad(now.getDate())} ${pad(now.getHours())}:${pad(now.getMinutes())}:${pad(now.getSeconds())}`;
  logStream.write(`${message} at ${timestamp}\n`);
  logStream.end();
}

function pad(val) {
  return val.toString().padStart(2, '0');
}

