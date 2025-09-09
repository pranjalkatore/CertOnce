const pool = require('./database');
const format = require('pg-format');
var nodemailer = require("nodemailer");
var xoauth2 = require('xoauth2');
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
module.exports =async(content,sub,to,aws_accesskey, aws_secretkey, region,from="",cc="",attachmentjsonfile="",attachmentpdffile="",attachment_filename="certificate",logfilename="/home/ubuntu/logs/default.log", cohorttablename, studentid) => {

   
   if(from=="" ||from==null) from=username;
   if(attachment_filename=="") attachment_filename="certificate";
   var jsonattachmentfilename=attachment_filename;
   if(attachmentjsonfile.indexOf(".png")!==-1 || attachmentjsonfile.indexOf(".PNG")!==-1) jsonattachmentfilename=jsonattachmentfilename+".png";
   else jsonattachmentfilename=jsonattachmentfilename+".json";
    //cc="info@enhelion.com";
    //to="om@growthschool.io";
    //cc="";
    //to="rajesh.ranjan@certonce.com";
    //to="nayjanta201813@gmail.com";
    //console.log("============");
    return new Promise((resolve,reject)=>{
        const aws = require("aws-sdk");
        aws.config.update({
            accessKeyId: aws_accesskey,
            secretAccessKey: aws_secretkey,
            region: region,
          });
        const ses = new aws.SES({
            apiVersion: '2010-12-01'
          });
        
        let nodemailer = require('nodemailer');
       
        
        let transporter = nodemailer.createTransport({
            SES: ses
        });       
       
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
                let updatesql= format(`UPDATE ${cohorttablename} SET certificatesendstate = 2  WHERE id=${studentid}`);
                await pool.query(updatesql);
                resolve(true);
            }
        });
  });
}

