const QRCode = require("qrcode");
const { BlobServiceClient } = require('@azure/storage-blob');
const mime = require('mime-types');
var path = require('path');
const https = require('https');
const { createCanvas, loadImage } = require("canvas");
const fs = require('fs');
const axios = require('axios');
const { google } = require('googleapis');
const TOKEN_PATH = {
  "ljku": "../issuer-node-master/gdrive_credential/ljku/gdrivetoken.json"
};
const CREDENTIAL_PATH = {
  "ljku": "../issuer-node-master/gdrive_credential/ljku/gdrivecredential.json"
}
var myip="https://www.certonce.com";
var bucket_key_pdf="signedcertificates/education/pdf/";
var wwwdir="/var/www/html";
async function getHtmlTemplate(templateid,html,verifyurl,isgenerate=false,pdffilename="",backgroundfilename="",trbackgroundfilename="", student=null)
{
   var organization_name="";
   var competencyname="";
   var issuedyear="";
   var issuedmonth="";
   var issuedday="";
   try
   {    
      
      contents=JSON.parse(html); 
      //fs.writeFileSync("/home/ubuntu/generatetemplateresult==.json",html);
      //console.log("contents.version======",contents.version);
      if(contents.version=="v2")
      {
        html=contents.displayHtml.replace(/TOP_DOUBLE_DOT/g, '"');
        organization_name=contents.badge.issuer.name.trim();
        competencyname=contents.recipient.competencyname.trim();
        var issedon=contents.issuedOn;
        issedon=issedon.split("T")[0];
        issuedyear=issedon.split("-")[0];
        issuedmonth=issedon.split("-")[1];
        issuedday=issedon.split("-")[2];
        
      }
      else if(contents.version=="v3")
      {
        html=contents.display.content.replace(/TOP_DOUBLE_DOT/g, '"');
        organization_name=contents.organization_name.trim();
        competencyname=contents.competencyname.trim();
        var issedon=contents.issuanceDate;
        issedon=issedon.split("T")[0];
        issuedyear=issedon.split("-")[0];
        issuedmonth=issedon.split("-")[1];
        issuedday=issedon.split("-")[2];
       
      }
      if (templateid == "template86e" || templateid == "template88e"){
        html = decodeURIComponent(html);
      }

   
   

   var headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">    
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>    
    </head>
    <body style="width:976px;">`;

    var headerpart1=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">    
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>    
    </head>
    <body style="width:976px;">`;
   
   var trailpart=`
    <table style="width: 99%;margin-top:5px;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
          </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(205, 153, 51);background: cadetblue;margin:10px;">
    </body>
    </html>

    </body>
    </html>
   `;

   if(templateid.indexOf("template25e")!=-1)
   {
      headerpart=`
     <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    <link rel="preconnect" href="https://fonts.gstatic.com">
    <link href="https://fonts.googleapis.com/css2?family=Open+Sans:wght@300;400;600;800&display=swap" rel="stylesheet">
    </style>
    </head>
    <body>  
   `;   
    trailpart=`    
      <table style="width: 99%;margin-top: 10px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 43px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <img src="https://www.certonce.com/images/share.png" style="width: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid #f2c057;background: #f2c057;">
    
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template26e")!=-1)
   {
      headerpart=`
         <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
         -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
          }
          @font-face {
          font-family:"BaroqueScript";
          src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        </style>
        </head>
        <body>   
            <div>
              <div>
                  <br>
                  <table style="width: 99%;margin-top: 10px;" >
                    <tbody>
                        <tr>
                            <td style="width:30%;text-align:center;"> 
                              <span style="margin: 0px 10px;font-size: 20px;top: -11px; position: relative;">Click Logo to verify&nbsp;</span>  
                              <a href="${verifyurl}"><img  style="width: 56px;" src="${myip}/images/backend/landdeedrecord.png" /></a>                  
                            </td>                
                            <td style="width:39%;text-align:center;">   
                              <span style="margin: 0px 10px;font-size: 20px;top: -20px; position: relative;">Scan to Verify&nbsp;</span>  
                              <img style="width: 73px;top: 3px; position: relative;" src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${verifyurl}" title='verify url' />
                            </td>
                            <td style="width:30%;text-align:center;">                            
                                <span style="margin: 0px 10px;font-size: 20px;top: -4px; position: relative;">Share&nbsp;</span>
                                <a href="https://wa.me/?text=${verifyurl}"><img style="width: 36px;top: 2px;position: relative;" src="https://www.certonce.com/images/whatsapp.png"  /></a>&nbsp;
                                <a href="https://mail.google.com/mail/?view=cm&fs=1&tf=1&to=&su=Verify+Url&body=${verifyurl}&ui=2&tf=1&pli=1"><img style="width: 46px;top: 7px;position: relative;" src="${myip}/images/backend/gmail_icon.png"  /></a>
                            </td>
                        </tr>
                  </table>
       `;   


        headerpart1=`
         <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
         -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
          }
          @font-face {
          font-family:"BaroqueScript";
          src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        </style>
        </head>
        <body>   
            <div>
              <div>                  
       `;   

        trailpart=`    
          </div>
            </div>
        </body>
        </html>
       `;
   }
   else if(templateid.indexOf("template22e")!=-1 || templateid.indexOf("template23e")!=-1 ||templateid.indexOf("template24e")!=-1)
   {
      
      headerpart=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <meta content="zh-tw" http-equiv="Content-Language" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title></title>
          <style>
          html {
          -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
            }
          @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
          @font-face {
              font-family:"Playball";
              src: url("https://www.certonce.com/fonts/mit/Playball.ttf") format("truetype");}   
          @font-face {
              font-family:"OPTIEngraversOldEnglish2";
              src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
          @font-face {
              font-family:"castlen";
              src: url("https://www.certonce.com/fonts/mit/castlen.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBTBold";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBTBold.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBT";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBT.ttf") format("truetype");}
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}          
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
          </head>
    <body style="padding-top: 20px;background-size: 100% 120%;background-repeat: repeat; background-image: url(&quot;${myip}/images/backend/mitbackground.png&quot;);" >    
      
   `;   
    trailpart=`    
      <div style="width: 99%;">      
      <img style="height:4px;width:725px;margin: 10px 25px;" id="logoimage3" src="${myip}/images/backend/mit_dist_line.png" />
      <table style="width: 100%;margin-bottom: -5px;margin-top: -7px;">
          <tbody>
              <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;padding-left: 13px;"> 
                    <span style="font-weight: bold;margin: 0px 10px;font-size: 16px;font-family: humnst777CnBT;color: rgb(46, 47, 62);">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;"> 
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/mitlogo.png" style="height: 35px;" /></a> 
                </td>                  
              </tr>
          </tbody>
        </table>
      </div> 
      </body>
      </html>
   `;
   }
   else if(templateid.indexOf("template19e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
       font-family:"BaroqueScript";
       src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      @font-face {
        font-family:"OPTIEngraversOldEnglish2";
        src: url("https://www.certonce.com/fonts/OPTIEngraversOldEnglish2.otf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="margin: -2px 0px;background-size: 100% 100%;width: 941px; background-repeat: repeat; background: rgb(255,255,255);" > 
   `;   
    trailpart=`    
      <hr style="border: 1px solid cadetblue;background: cadetblue;margin:5px 10px;width:115%;">
        <table style="width: 117%;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;"> 
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/kullar_logo.png" style="height: 46px;" /></a> 
                </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:10px;width:115%;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template16e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">    
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    
    </head>

    <body style="width: 1300px;padding-right:8px;">
   `;   
    trailpart=`    
    <table style="width: 99%;margin-top:5px;">
        <tbody>
                <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(205, 153, 51);background: cadetblue;margin:10px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template15e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">    
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@700&display=swap" rel="stylesheet">
    </head>
    <body style="width:779px">
   `;   
    trailpart=`
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:10px;">    
    <table style="width: 99%;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
          </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:10px;">
   `;
   }
  else if(templateid.indexOf("template14e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">    
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>    
    </head>
    <body style="width:976px;padding-left:60px;padding-top:50px;">
   `;   

    trailpart=`
    <br>
    <table style="width: 99%;margin-top:5px;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
          </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(205, 153, 51);background: cadetblue;margin:10px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template13e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="padding-top: 2px;"> 
    
   `;   

    trailpart=`
    
    <table style="width: 99%;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
            </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank"  href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a target="_blank" href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a target="_blank" href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>
    <hr style="border: 1px solid rgb(186,47,71);background: rgb(186,47,71); margin-top: 0px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template12e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="width: 1100px;"> 
    <br>
    
   `;   

    trailpart=`    
    <hr style="border: 1px solid rgb(239, 127, 26);background: rgb(239, 127, 26);margin:10px;">    
    <table style="width: 99%;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
          </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a>
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a> 
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(239, 127, 26);background: rgb(239, 127, 26);margin:10px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template11e")!=-1)
   {
   headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="padding-top: 2px;"> 
    
   `;   

    trailpart=`
    
    <table style="width: 99%;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
          </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>
    <hr style="border: 1px solid rgb(255,163,0);background: rgb(255,163,0); margin-top: 0px;">
    </body></html>
   `;
   }
   else if(templateid.indexOf("template10e")!=-1 || templateid.indexOf("template46e")!=-1 || templateid.indexOf("template47e")!=-1 )
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="width: 779px; background-repeat: repeat; background-image: url(&quot;${myip}/images/backend/enhelion_sub_1.png&quot;);" >    
   `;   

    trailpart=`     
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:20px 10px 5px 10px;">
    <table style="width: 99%;margin-top:0px;margin-bottom:0px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">                    
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                      <img src="https://www.certonce.com/images/share.png" style="width: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>     
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:5px 10px 0px 10px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template1e")!=-1)
   {
    
    let qr_code = await getQRwithbase64(verifyurl, 300);
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    </head>
    <body style="width:297mm;height:200mm;">
    <table style="position: absolute; top: 70px;left:25px;margin-top: 0px; margin-left: 50px;margin-bottom: 0px;z-index:10px;">
        <tbody>
          <tr>
            <td style="text-align: left;"> 
                <img style="height: 90px;" src="${qr_code}">                  
            </td> 
          </tr>
        </tbody>
    </table>
    
   `;   
    trailpart=`
    <table style="position: absolute; top: 70px;left:25px;margin-top: 0px; margin-left: 50px;margin-bottom: 0px;">
        <tbody>
          <tr>
            <td style="text-align: left;"> 
                <img style="height: 90px;" src="${qr_code}">                  
            </td> 
          </tr>
        </tbody>
      </table>
    <table style="width: 99%;margin-top: 10px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 43px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">                    
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                     <img src="https://www.certonce.com/images/share.png" style="width: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid #012945;background: #012945;margin:10px;">
    </div>
    </body>
    </html>
   `;
   trailpart=`
    
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template2e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">

    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Old+Standard+TT:wght@700&display=swap" rel="stylesheet">
    </head>

    <body style="padding:0px 60px 0px 60px;">
   `;   
  //   trailpart=`
    
  //     <br>
  //     <br>
  //     <br>
  //     <br>
      
  //     <div style="background-color: cadetblue;height: 2px;"></div>
  //     <br>
  //     <table style="width:100%;">
  //         <tbody>
  //             <tr>
  //                  <td style="text-align: left;width: 1%;white-space: nowrap;"> 
  //                   <span style="margin: 0px 0px;font-size: 14px;">This is a blockchain secured tamper-proof document. Click this logo to verify&nbsp;&nbsp;</span>                    
  //               </td>                
  //               <td style="text-align: right;"> 
  //                   <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="height: 40px;" /></a> 
  //               </td>
  //             </tr>
  //         </tbody>
  //     </table>   
  //   </body>
  //   </html>
  //  `;
  trailpart=`
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      <br>
      
      <div style="background-color: cadetblue;height: 2px;"></div>
      <br>
      <table style="width:100%;">
        <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 0px;font-size: 14px;">This is a blockchain secured tamper-proof document. Click this logo to verify&nbsp;&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/wellsfargo.png" style="width: 25px;" /></a>&nbsp;&nbsp;                               
              </td>
              <td style="text-align: right;">                  
                  <img src="https://www.certonce.com/images/share.png" style="height: 20px;" /> &nbsp;                  
                  <a href="mailto:?subject=CertOnce Verification&amp;body=${verifyurl}" title=""><img src="http://png-2.findicons.com/files/icons/573/must_have/48/mail.png" style="height: 20px;" ></a>  
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 20px;padding-right: 10px;" /></a>
              </td>
            </tr>
        </tbody>
      </table>   
    </body>
    </html>
   `;
   }
  else if(templateid.indexOf("template3e")!=-1)
  {
    if (student['enrollnumber'] == "NDIM/PGDM/M/18006/1-7225891154" || student['enrollnumber'] == "NDIM/PGDM/G/18212/1-9445595241") {
      html=html.replace("margin-top: 130px;","margin-top: 125px;");
    } else {
      html=html.replace("margin-top: 130px;","margin-top: 100px;");
    }
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
          @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
          }
          @font-face {
            font-family:"britanic";
            src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
          }
          @font-face {
            font-family:"calibri";
            src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
          }
        </style>
        <style>
        *{
          margin: 0px;
          padding: 0px;
        }
        .main-back{
          background-image: url('https://www.certonce.com/images/NDIM/pgdmbacknew.png');
          background-repeat: no-repeat;
          background-size: cover;
          width:297mm;
          height:196.19647917mm;
        }
      </style>
      </head>
      <body>`;
    trailpart=`<table style="width: 100%;margin-top: 2px;margin-left: 0px;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
          </td>
          <td style="text-align: right;">
              <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
              <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
              <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
              <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
              <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
              &nbsp;
              <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
          </td>
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
  }
    else if(templateid.indexOf("template7e")!=-1)
    {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
          } 
          @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
          }
          @font-face {
              font-family:"britanic";
                src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
          }
          @font-face {
                font-family:"calibri";
                src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;   

      trailpart1=`<table style="width: 100%;margin-top: -50px;margin-left: 0px; margin-bottom: -10px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
                </td>
            </tr>
        </tbody>
      </table>   
      </body>
      </html>`;
      trailpart=`<table style="width: 96%; position: absolute; top: 2195px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 30px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
                </td>
            </tr>
        </tbody>
      </table>   
      </body>
        </html>`;
      html = html.replace("NDIM_SECOND_BACK", "https://www.certonce.com/images/NDIM/ndimtranscript_2018_2020_back.png");
    }
   else if(templateid.indexOf("template8e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    </style>
    </head>
    <body style="width:779px">
    
   `;   
    trailpart=`
    <br><br><br><br><br><br><br><br><br><br><br><br><br><br>
    <div style="background-color: cadetblue;height: 2px;margin-left: 50px;margin-right: 50px;"></div>
    <br>
    <p style="margin: 0px 50px;font-size: 15px;">This credential is blockchain anchored tamper-proof certificate. To verify, click here.</p>    
    <p style="text-decoration: underline;color: blue;margin: 5px 50px;font-size: 15px;">${verifyurl}</p>
    
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template30e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -45px;margin-left: 45px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;
                </td>
                <td style="text-align: right;">
                    <a target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a target="_blank" href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a target="_blank" href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(90, 55, 132);background: rgb(90, 55, 132);margin-left: 52px;width: 214mm;">
    
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template31e")!=-1)
   {
      headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -45px;margin-left: 45px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;
                </td>
                <td style="text-align: right;">
                    <a target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a target="_blank" href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a target="_blank" href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(247, 150, 51);background: rgb(247, 150, 51);margin-left: 52px;width: 214mm;">
    
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template41e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
       @font-face {
          font-family:"BaroqueScript";
          src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
       @font-face {
          font-family:"Playball";
          src: url("https://www.certonce.com/fonts/mit/Playball.ttf") format("truetype");}   
       @font-face {
          font-family:"OPTIEngraversOldEnglish2";
          src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
       @font-face {
          font-family:"castlen";
          src: url("https://www.certonce.com/fonts/mit/castlen.ttf") format("truetype");}  
        @font-face {
          font-family:"humnst777CnBTBold";
          src: url("https://www.certonce.com/fonts/mit/humnst777CnBTBold.ttf") format("truetype");}  
        @font-face {
          font-family:"humnst777CnBT";
          src: url("https://www.certonce.com/fonts/mit/humnst777CnBT.ttf") format("truetype");}
      
        @font-face {
          font-family:"Aspire";
          src: url("https://www.certonce.com/fonts/Aspire-DemiBold.ttf") format("truetype");}        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body>    
   `;   
   trailpart=`
      <table style="width: 100%;margin-top: 10px;margin-left: 0px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(2, 83, 82);background: rgb(2, 83, 82);margin-left: 0px;width: 100%;margin-bottom: -4px;margin-top: -3px;">
    </body>
    </html>
    `;
   }
   else if(templateid.indexOf("template42e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
       @font-face {
          font-family:"BaroqueScript";
          src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
       @font-face {
          font-family:"Playball";
          src: url("https://www.certonce.com/fonts/mit/Playball.ttf") format("truetype");}   
       @font-face {
          font-family:"OPTIEngraversOldEnglish2";
          src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
       @font-face {
          font-family:"castlen";
          src: url("https://www.certonce.com/fonts/mit/castlen.ttf") format("truetype");}  
        @font-face {
          font-family:"humnst777CnBTBold";
          src: url("https://www.certonce.com/fonts/mit/humnst777CnBTBold.ttf") format("truetype");}  
        @font-face {
          font-family:"humnst777CnBT";
          src: url("https://www.certonce.com/fonts/mit/humnst777CnBT.ttf") format("truetype");}
      
        @font-face {
          font-family:"Aspire";
          src: url("https://www.certonce.com/fonts/Aspire-DemiBold.ttf") format("truetype");}        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body>    
   `;   
    trailpart=`
      <table style="width: 100%;margin-top: 0px;margin-left: 0px;">
      <tbody>
          <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
              </td>
          </tr>
      </tbody>
  </table>   
  <hr style="border: 1px solid rgb(2, 83, 82);background: rgb(2, 83, 82);margin-left: 0px;width: 100%;margin-bottom: -5px;margin-top: 0px;">
  </body>
  </html>
   `;
   }
   else if(templateid.indexOf("template51e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}

      ul {list-style: none}
      li::before {content: "\\2022"; color: rgb(88, 89, 91); display: inline-block; width: 1em; margin-left: -1em;margin-top: 0px;height: 3px;}
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">

      </head>
      <body style="padding-top: 2px;">
   `;   
   trailpart=`
   <table style="margin-top: 12px;margin-bottom: -10px;">
       <tbody>
           <tr>
               <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                   <p style="font-size:11pt;font-family:'Roboto', sans-serif;color:rgb(88, 89, 91);margin:0px;">Click the logo to verify on Blockchain</p>        
               </td>                
               <td style="text-align: left;">     
               <a href="${verifyurl}"><img src="https://www.certonce.com/images/360/logo.png" style="width: 39px;" /></a>&nbsp;&nbsp;
               </td>
               <td style="text-align: right;">
                   <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                   <img src="https://www.certonce.com/images/360/share.png" style="height: 26px;" /> &nbsp;
                   <a target="_blank" href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/360/facebook.png" style="height: 26px;" /></a> &nbsp;
                   <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/360/linkedin.png" style="height: 26px;" /></a> &nbsp;                    
                   <a target="_blank" href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/360/twitter.png" style="height: 26px;" /></a> 
                   &nbsp;
                   <a target="_blank" href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/360/whatsapp.png" style="height: 26px;" /></a>
                   &nbsp;
                   <a target="_blank" href="https://www.instagram.com/?url=${verifyurl}"><img src="https://www.certonce.com/images/360/instagram.png" style="height: 26px;" /></a>
               </td>
           </tr>
       </tbody>
      </table>   
    </body>
    </html>
    `;
   }
   else if(templateid.indexOf("template35e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -35px;margin-left: 45px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>   
    <hr style="border: 1px solid rgb(90, 55, 132);background: rgb(90, 55, 132);margin-left: 52px;width: 214mm;">   
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template36e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -35px;margin-left: 45px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    <hr style="border: 1px solid rgb(247, 150, 51);background: rgb(247, 150, 51);margin-left: 52px;width: 214mm;"> 
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template55e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="padding-top: 2px;">
    
   `;   

    trailpart=`
    
    <table style="width: 99%;margin-top: 4px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 43px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">                    
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}">
                    <img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                     <img src="https://www.certonce.com/images/share.png" style="width: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid #1d483e;background: #1d483e; margin-top: 0px;">
  
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template56e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      @font-face {
         font-family:"calibri";
         src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
      }
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>
   `;   
    trailpart=`
    <table style="width: 93%;margin-top: -20px; margin-left: 30px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="font-size: 17px;">Click here to verify on blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}">
                    <img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>   
    <hr style="border: 1px solid rgb(90, 55, 132);background: rgb(163, 161, 165);margin-left: 30px;margin-right: 30px; margin-top: 0px;margin-bottom: 4px;">
    
    </body>
    </html>
   `;
   } 
   else if(templateid.indexOf("template57e")!=-1)
   {
    
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="width: 779px; background-repeat: repeat; background-image: url(&quot;${myip}/images/backend/enhelion_sub_1.png&quot;);" >
   `;   
    trailpart=`
    <center >
        <hr style="width: 96%; border: 1px solid cadetblue;background: cadetblue; margin-top: 15px;">    
        <table style="width: 96%; margin-top: -5px; margin-bottom: -5px;">
            <tbody>
                <tr>
                    <td style="width: 1%;white-space: nowrap;"> 
                        <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                    </td>                
                    <td style="text-align: left;">     
                        <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
                    </td>
                    <td style="text-align: right;">
                        <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}">
                        <img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                        <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                        <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                        <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                        &nbsp;
                        <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
                    </td>
                </tr>
            </tbody>
        </table>   
        <hr style="width: 96%; border: 1px solid cadetblue;background: cadetblue;">
    </center>    
    </body>
    </html>
   `;
   } 
   else if(templateid.indexOf("template60e")!=-1)
   {
    
      headerpart=`
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
      <title></title>
      <style type="text/css">
      #resp-table {
              width: 100%;
              display: table;
          }
          #resp-table-body{
              display: table-row-group;
          }
          .resp-table-row{
              display: table-row;
          }
          .table-body-cell{
              display: table-cell;        
              text-align: center;
              vertical-align: top;
          }
          .table-body-cell1{
              display: table-cell;        
              width: 287px;
              vertical-align: top;
          }
          html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
      
        @font-face {
          font-family:"Edwardian";
          src: url("https://www.certonce.com/fonts/Edwardian.ttf") format("truetype");}

        @font-face {
          font-family:"arrus";
          src: url("https://www.certonce.com/fonts/unicode.arrusn.ttf") format("truetype");}
      </style>

      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0px;"> `;   
      trailpart=`
      <center >
        <table style="width: 100%; margin-bottom: -5px;margin-top: 0px;">
            <tbody>
                <tr>
                    <td style="width: 1%;white-space: nowrap;"> 
                        <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
                    </td>                
                    <td style="text-align: left;">     
                        <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 32px;" /></a>&nbsp;&nbsp;                    
                    </td>
                    <td style="text-align: right;padding-right: 10px;">
                        
                        <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 23px;" /></a> &nbsp;
                        <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 23px;" /></a> &nbsp;                    
                        <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 23px;" /></a> 
                        &nbsp;
                        <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 23px;" /></a>
                    </td>
                </tr>
            </tbody>
        </table>   
        <hr style="width: 100%; border: 1px solid cadetblue;background: cadetblue;margin:0px;margin-top: 4px;">
    </center>       
</body>
</html>
   `;
   }
   else if(templateid.indexOf("template61e")!=-1)
   {
    
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
      <title></title>
      <style type="text/css">
      #resp-table {
              width: 100%;
              display: table;
          }
          #resp-table-body{
              display: table-row-group;
          }
          .resp-table-row{
              display: table-row;
          }
          .table-body-cell{
              display: table-cell;        
              text-align: center;
              vertical-align: top;
          }
          .table-body-cell1{
              display: table-cell;        
              width: 287px;
              vertical-align: top;
          }
          html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
      
        @font-face {
          font-family:"Edwardian";
          src: url("https://www.certonce.com/fonts/Edwardian.ttf") format("truetype");}

        @font-face {
          font-family:"arrus";
          src: url("https://www.certonce.com/fonts/unicode.arrusn.ttf") format("truetype");}
      </style>

      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
      </head>

      <body style="margin:0px;"> `;   
      trailpart=`
        <center >
          <table style="width: 100%; margin-bottom: -5px;">
              <tbody>
                  <tr>
                      <td style="width: 1%;white-space: nowrap;"> 
                          <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
                      </td>                
                      <td style="text-align: left;">     
                          <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 32px;" /></a>&nbsp;&nbsp;                    
                      </td>
                      <td style="text-align: right;padding-right: 10px;">
                          
                          <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 30px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                          <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                          <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 23px;" /></a> &nbsp;
                          <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 23px;" /></a> &nbsp;                    
                          <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 23px;" /></a> 
                          &nbsp;
                          <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 23px;" /></a>
                      </td>
                  </tr>
              </tbody>
          </table>   
          <hr style="width: 100%; border: 1px solid cadetblue;background: cadetblue;margin:0px;margin-top: 4px;">
      </center>       
  </body>
  </html>
   `;
   }
   else if(templateid.indexOf("template62e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
      <title></title>
      <style type="text/css">
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"LibreBaskerville_Bold";
            src: url("https://www.certonce.com/fonts/leadwomen/LibreBaskerville-Bold.ttf") format("truetype");
         }  
        @font-face {
               font-family:"GlacialIndifference_Regular";
               src: url("https://www.certonce.com/fonts/leadwomen/GlacialIndifference-Regular.otf") format("truetype");
         }  
         @font-face {
               font-family:"GalacialIndifference_Bold";
               src: url("https://www.certonce.com/fonts/leadwomen/GlacialIndifference-Bold.otf") format("truetype");
         }
         @font-face {
               font-family:"Cardo_Regular";
               src: url("https://www.certonce.com/fonts/leadwomen/Cardo-Regular.ttf") format("truetype");
         }
      </style>

      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
      </head>

      <body style="margin:0px;">`;   
      trailpart=`      
      <table style="width: 100%;margin-top: 5px; margin-bottom: -20px;">
      <tbody>
          <tr>
              <td style="width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
              </td>
          </tr>
      </tbody>
  </table>   
  </body>
  </html>
   `;
   }
   else if(templateid.indexOf("template64e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
      <title></title>
      <style type="text/css">
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"LibreBaskerville_Bold";
            src: url("https://www.certonce.com/fonts/leadwomen/LibreBaskerville-Bold.ttf") format("truetype");
         }  
        @font-face {
               font-family:"GlacialIndifference_Regular";
               src: url("https://www.certonce.com/fonts/leadwomen/GlacialIndifference-Regular.otf") format("truetype");
         }  
         @font-face {
               font-family:"GalacialIndifference_Bold";
               src: url("https://www.certonce.com/fonts/leadwomen/GlacialIndifference-Bold.otf") format("truetype");
         }
         @font-face {
               font-family:"Cardo_Regular";
               src: url("https://www.certonce.com/fonts/leadwomen/Cardo-Regular.ttf") format("truetype");
         }
         @font-face {
          font-family:"OPTIEngraversOldEnglish2";
          src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
      </style>

      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
      </head>

      <body style="margin:0px;">`;   
      trailpart=`      
      <table style="width: 100%;margin-top: 8px;margin-left: 0px; margin-bottom: -20px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/chandigarh_university.png" style="height: 30px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">
                    <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table> 
   `;
   }
   else if(templateid.indexOf("template65e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -40px;margin-left: 45px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&amp;organizationName=Digital%20Deepak&amp;certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
        </tr>
    </tbody>
</table>   
<hr style="border: 1px solid rgb(247, 150, 51);background: rgb(247, 150, 51);margin-left: 52px;width: 214mm;">

</body>
</html>
   `;
   }
   else if(templateid.indexOf("template66e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -40px;margin-left: 45px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&amp;organizationName=Digital%20Deepak&amp;certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
        </tr>
    </tbody>
</table>   
<hr style="border: 1px solid rgb(90, 55, 132);background: rgb(90, 55, 132);margin-left: 52px;width: 214mm;">

</body>
</html>
   `;
   }
   else if(templateid.indexOf("template67e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -40px;margin-left: 45px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&amp;organizationName=Digital%20Deepak&amp;certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
        </tr>
    </tbody>
</table>   
<hr style="border: 1px solid rgb(247, 150, 51);background: rgb(247, 150, 51);margin-left: 52px;width: 214mm;">

</body>
</html>
   `;
   }
   else if(templateid.indexOf("template68e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -40px;margin-left: 45px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&amp;organizationName=Digital%20Deepak&amp;certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
        </tr>
    </tbody>
</table>   
<hr style="border: 1px solid rgb(90, 55, 132);background: rgb(90, 55, 132);margin-left: 52px;width: 214mm;">

</body>
</html>
   `;
   }
   else if(templateid.indexOf("template69e")!=-1)
   {
    
      headerpart=`
      <!DOCTYPE HTML PUBLIC "-//W3C//DTD HTML 4.01//EN" "http://www.w3.org/TR/html4/strict.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
      <title></title>
      <style type="text/css">
      #resp-table {
              width: 100%;
              display: table;
          }
          #resp-table-body{
              display: table-row-group;
          }
          .resp-table-row{
              display: table-row;
          }
          .table-body-cell{
              display: table-cell;        
              text-align: center;
              vertical-align: top;
          }
          .table-body-cell1{
              display: table-cell;        
              width: 287px;
              vertical-align: top;
          }
          html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
      
        @font-face {
          font-family:"Edwardian";
          src: url("https://www.certonce.com/fonts/Edwardian.ttf") format("truetype");}

        @font-face {
          font-family:"arrus";
          src: url("https://www.certonce.com/fonts/unicode.arrusn.ttf") format("truetype");}
      </style>

      <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
      </head>
      <body style="margin:0px;"> `;   
      trailpart=`
      <center >
        <table style="width: 100%; margin-bottom: -5px;margin-top: 0px;">
            <tbody>
                <tr>
                    <td style="width: 1%;white-space: nowrap;"> 
                        <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
                    </td>                
                    <td style="text-align: left;">     
                        <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 32px;" /></a>&nbsp;&nbsp;                    
                    </td>
                    <td style="text-align: right;padding-right: 10px;">
                        <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=&organizationName=${organization_name}&certUrl=${verifyurl}">
                        <img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                        <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                        <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 23px;" /></a> &nbsp;
                        <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 23px;" /></a> &nbsp;                    
                        <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 23px;" /></a> 
                        &nbsp;
                        <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 23px;" /></a>
                    </td>
                </tr>
            </tbody>
        </table>   
        <hr style="width: 100%; border: 1px solid cadetblue;background: cadetblue;margin:0px;margin-top: 4px;">
    </center>       
</body>
</html>
   `;
   }
   else if(templateid.indexOf("template70e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">   
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="padding-top: 2px;"> 
    
   `;   

    trailpart=`
    
    <table style="width: 99%;">
        <tbody>
            <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
            </td>
                <td style="text-align: right;">
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank"  href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a target="_blank" href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a target="_blank" href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a target="_blank" href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>
    <hr style="border: 1px solid rgb(90, 55, 132);background: rgb(90, 55, 132); margin-top: 0px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template71_olde")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }  
        @font-face {
          font-family:"androgyne";
            src: url("https://www.certonce.com/fonts/chauru/androgyne (regular).otf") format("truetype");
        }
        @font-face {
          font-family:"cronosbold";
            src: url("https://tewwwst.certonce.com/fonts/chauru/cronos pro (bold).otf") format("truetype");
        }
        @font-face {
          font-family:"cronos";
            src: url("https://www.certonce.com/fonts/chauru/cronos pro (regular).otf") format("truetype");
        }
        @font-face {
          font-family:"micrenc";
            src: url("https://www.certonce.com/fonts/chauru/micrenc.ttf") format("truetype");
        }
        @font-face {
          font-family:"mtcorsva";
            src: url("https://www.certonce.com/fonts/chauru/mtcorsva.ttf") format("truetype");
        }
        @font-face {
          font-family:"nuevastd";
            src: url("https://www.certonce.com/fonts/chauru/nuevastd-boldcond.otf") format("truetype");
        }
        @font-face {
          font-family:"swis721bold";
            src: url("https://www.certonce.com/fonts/chauru/swis721 cn bt bold.ttf") format("truetype");
        }
        @font-face {
          font-family:"swis721roman";
            src: url("https://www.certonce.com/fonts/chauru/swis721 cn bt roman.ttf") format("truetype");
        }
        @font-face {
          font-family:"zapfchancerymediumitalicbold";
            src: url("https://www.certonce.com/fonts/chauru/Zapf Chancery Medium Italic.otf") format("truetype");
        }       
      #template71e {           
        background-image: url("https://www.certonce.com/images/charusatwatermark1.png");
        background-repeat: no-repeat;
        background-size: cover;
        width:210mm;
        height:297mm;
      }   
      #template71-1e {           
        background-image: url("https://www.certonce.com/images/charusatwatermark2.png");
        background-repeat: no-repeat;
        background-size: cover;
        width:210mm;
        height:297mm;
      }        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`
    <table style="width: 100%;margin-top: -50px;margin-left: 0px; margin-bottom: -20px;">
      <tbody>
          <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">                  
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;                  
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
              </td>
          </tr>
      </tbody>
    </table>   
    </body>
    </html>
   `;
   secondpage = `
    <center>
    <img style={{width: '100%', marginBottom: '0px'}} src="${myip}/images/backend/charusat_background.png" />
    </center>
   `;

   html = html.replace("CHARUSAT_SECOND_PAGE_REPLACE", "");
   html = html.replace(/VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template71e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }  
        @font-face {
          font-family:"androgyne";
            src: url("https://www.certonce.com/fonts/chauru/androgyne (regular).otf") format("truetype");
        }
        @font-face {
          font-family:"cronosbold";
            src: url("https://tewwwst.certonce.com/fonts/chauru/cronos pro (bold).otf") format("truetype");
        }
        @font-face {
          font-family:"cronos";
            src: url("https://www.certonce.com/fonts/chauru/cronos pro (regular).otf") format("truetype");
        }
        @font-face {
          font-family:"micrenc";
            src: url("https://www.certonce.com/fonts/chauru/micrenc.ttf") format("truetype");
        }
        @font-face {
          font-family:"mtcorsva";
            src: url("https://www.certonce.com/fonts/chauru/mtcorsva.ttf") format("truetype");
        }
        @font-face {
          font-family:"nuevastd";
            src: url("https://www.certonce.com/fonts/chauru/nuevastd-boldcond.otf") format("truetype");
        }
        @font-face {
          font-family:"swis721bold";
            src: url("https://www.certonce.com/fonts/chauru/swis721 cn bt bold.ttf") format("truetype");
        }
        @font-face {
          font-family:"swis721roman";
            src: url("https://www.certonce.com/fonts/chauru/swis721 cn bt roman.ttf") format("truetype");
        }
        @font-face {
          font-family:"zapfchancerymediumitalicbold";
            src: url("https://www.certonce.com/fonts/chauru/Zapf Chancery Medium Italic.otf") format("truetype");
        }       
      #template71e {           
        background-image: url("https://www.certonce.com/images/charusatwatermark13.png");
        background-repeat: no-repeat;
        background-size: cover;
        width:210mm;
        height:297mm;
      }
      #charusatsecondpage {           
        background-image: url("https://www.certonce.com/images/charusatwatermark2.png");
        background-repeat: no-repeat;
        background-size: cover;
        width:210mm;
        height:294mm;
      }       
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`</body>
    </html>`;
   secondpage = `
    <center>
    <img style={{width: '100%', marginBottom: '0px'}} src="${myip}/images/backend/charusat_background.png" />
    </center>
   `;
   
   html = html.replace("CHARUSAT_SECOND_PAGE_REPLACE", secondpage);
   html = html.replace(/VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template72e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        #template72e {           
          background-image: url("https://www.certonce.com/images/bannett_background.png");
          background-repeat: no-repeat;
          background-size: cover;
          width:210mm;
          height:294mm;
        }           
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`     
    </body>
    </html>
   `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template74e")!=-1)
   {
      
      headerpart=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <meta content="zh-tw" http-equiv="Content-Language" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title></title>
          <style>
          html {
          -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
            }
          @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
          @font-face {
              font-family:"Playball";
              src: url("https://www.certonce.com/fonts/mit/Playball.ttf") format("truetype");}   
          @font-face {
              font-family:"OPTIEngraversOldEnglish2";
              src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
          @font-face {
              font-family:"castlen";
              src: url("https://www.certonce.com/fonts/mit/castlen.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBTBold";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBTBold.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBT";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBT.ttf") format("truetype");}
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}    
            #template74e {      
              background-image: url("https://www.certonce.com/images/mitwatermark.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;   
            }        
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
          </head>
    
      
   `;   
    trailpart=`    
    <table style="width: 100%;margin-top: -10px;margin-left: 0px; margin-right: 0px; margin-bottom: -10px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">                  
                <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;                  
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
            </td>
        </tr>
    </tbody>
  </table>
   `;
   }
   else if(templateid.indexOf("template75e")!=-1)
   {      
      headerpart=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <meta content="zh-tw" http-equiv="Content-Language" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title></title>
          <style>
          html {
          -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
            }
          @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
          @font-face {
              font-family:"Playball";
              src: url("https://www.certonce.com/fonts/mit/Playball.ttf") format("truetype");}   
          @font-face {
              font-family:"OPTIEngraversOldEnglish2";
              src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
          @font-face {
              font-family:"castlen";
              src: url("https://www.certonce.com/fonts/mit/castlen.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBTBold";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBTBold.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBT";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBT.ttf") format("truetype");}
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}    
            #template75e {      
              background-image: url("https://www.certonce.com/images/mitwatermark.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;   
            }        
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
          </head>
    
      
   `;   
    trailpart=`    
    <table style="width: 100%;margin-top: -10px;margin-left: 0px; margin-right: 0px; margin-bottom: -10px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">                  
                <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;                  
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
            </td>
        </tr>
    </tbody>
  </table>
   `;
   }
   else if(templateid.indexOf("template76e")!=-1)
   {
      
      headerpart=`
        <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
          <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
          <meta content="zh-tw" http-equiv="Content-Language" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title></title>
          <style>
          html {
          -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
            }
          @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
          @font-face {
              font-family:"Playball";
              src: url("https://www.certonce.com/fonts/mit/Playball.ttf") format("truetype");}   
          @font-face {
              font-family:"OPTIEngraversOldEnglish2";
              src: url("https://www.certonce.com/fonts/mit/ENGROLEN.ttf") format("truetype");}
          @font-face {
              font-family:"castlen";
              src: url("https://www.certonce.com/fonts/mit/castlen.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBTBold";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBTBold.ttf") format("truetype");}  
            @font-face {
              font-family:"humnst777CnBT";
              src: url("https://www.certonce.com/fonts/mit/humnst777CnBT.ttf") format("truetype");}
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}    
            #template76e {      
              background-image: url("https://www.certonce.com/images/mitwatermark.png");
              background-repeat: no-repeat;
              background-size: 100% 100%;   
            }        
          </style>
          <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
          </head>
    
      
   `;   
    trailpart=`    
    <table style="width: 100%;margin-top: -10px;margin-left: 0px; margin-right: 0px; margin-bottom: -10px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">                  
                <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;                  
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
            </td>
        </tr>
    </tbody>
  </table>
   `;
   }
  else if(templateid.indexOf("template78e")!=-1) {
    if (student['enrollnumber'] == "NDIM/PGDM/G/19221/1-7231704116" || student['enrollnumber'] == "NDIM/PGDM/G/19087/1-7231502311" || student['enrollnumber'] == "NDIM/PGDM/G/19204/1-7231703949" || student['enrollnumber'] == "NDIM/PGDM/G/19219/1-7231704098") {
      html = html.replace("margin-top: 130px;","margin-top: 125px;");
    } else {
      html=html.replace("margin-top: 130px;","margin-top: 101px;");
    }
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
          @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
          }
          @font-face {
            font-family:"britanic";
            src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
          }
          @font-face {
            font-family:"calibri";
            src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
          }
          *{
            margin: 0px;
            padding: 0px;
          }
          .main-back{
            background-image: url('https://www.certonce.com/images/NDIM/softcopymainback_new.png');
            background-repeat: no-repeat;
            background-size: cover;
            width:297mm;
            height:196.19647917mm;
          }
        </style>
      </head>
      <body>`;
    trailpart=`<table style="width: 100%;margin-top: 2px;margin-left: 0px;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
          </td>
          <td style="text-align: right;">
            <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
            <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
            <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
            <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
            <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
            &nbsp;
            <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
          </td>
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
  }
   else if(templateid.indexOf("template79e")!=-1 || templateid.indexOf("template80e")!=-1 || templateid.indexOf("template81e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
     min-height: 100%;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
      @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
      
   
      body
      {
        margin: 0px 0px 0px 0px;
      }
    </style>
    </head>
    <body>    
    
   `;   
    trailpart=`
    <table style="width: 217mm;margin-top: -40px;margin-left: 45px;">
    <tbody>
        <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pdf.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&amp;organizationName=Digital%20Deepak&amp;certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
        </tr>
    </tbody>
</table>   
<hr style="border: 1px solid rgb(247, 150, 51);background: rgb(247, 150, 51);margin-left: 52px;width: 214mm;">

</body>
</html>
   `;
   }
   else if(templateid.indexOf("template86e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }
        @font-face {
          font-family:"poppinsmedium";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Medium.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinsright";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Light.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinssemibold";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-SemiBold.ttf") format("truetype");
        }
        @font-face {
            font-family:"krutidev40wide";
            src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 040 Wide Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev16thin";
          src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 016 Thin.ttf") format("truetype");
        }
        @font-face {
            font-family:"krishna";
              src: url("https://www.certonce.com/fonts/nitkkr/Krishna .ttf") format("truetype");
        }
        @font-face {
              font-family:"clibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasi728";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-728.ttf") format("truetype");
        }
          
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasimitra";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Mitra-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblack";
          src: url("https://www.certonce.com/fonts/nitkkr/CloisterBlack.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblacklefty";
          src: url("https://www.certonce.com/fonts/nitkkr/Cloister_ Black-Light Lefty Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"dvttsurekh";
          src: url("https://www.certonce.com/fonts/nitkkr/DV-TTSurekh_Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"mangal";
          src: url("https://www.certonce.com/fonts/nitkkr/Mangal Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"shelleyallegro";
          src: url("https://www.certonce.com/fonts/nitkkr/Shelley Allegro BT.ttf") format("truetype");
        }
        @font-face {
          font-family:"rollin";
          src: url("https://www.certonce.com/fonts/nitkkr/A Rollin' 1 Regular.ttf") format("truetype");
        }    
        #template86e {           
          background-image: url("https://www.certonce.com/images/nitkkr_background.png");
        }           
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`     
    </body>
    </html>
   `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template88e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }
        @font-face {
          font-family:"poppinsmedium";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Medium.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinsright";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Light.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinssemibold";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-SemiBold.ttf") format("truetype");
        }
        @font-face {
            font-family:"krutidev40wide";
            src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 040 Wide Regular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"krutidev16thin";
          src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 016 Thin.ttf") format("truetype");
        }
        @font-face {
            font-family:"krishna";
              src: url("https://www.certonce.com/fonts/nitkkr/Krishna .ttf") format("truetype");
        }
        @font-face {
              font-family:"clibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasi728";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-728.ttf") format("truetype");
        }
          
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasimitra";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Mitra-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblack";
          src: url("https://www.certonce.com/fonts/nitkkr/CloisterBlack.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblacklefty";
          src: url("https://www.certonce.com/fonts/nitkkr/Cloister_ Black-Light Lefty Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"dvttsurekh";
          src: url("https://www.certonce.com/fonts/nitkkr/DV-TTSurekh_Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"mangal";
          src: url("https://www.certonce.com/fonts/nitkkr/Mangal Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"shelleyallegro";
          src: url("https://www.certonce.com/fonts/nitkkr/Shelley Allegro BT.ttf") format("truetype");
        }
        @font-face {
          font-family:"rollin";
          src: url("https://www.certonce.com/fonts/nitkkr/A Rollin' 1 Regular.ttf") format("truetype");
        }    
        #template88e {           
          background-image: url("https://www.certonce.com/images/IIIT_background.png");
        }           
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`     
    </body>
    </html>
   `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template87e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"clibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}
        @font-face {
          font-family:"abbasi728";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-728.ttf") format("truetype");}
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasimitra";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Mitra-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblack";
          src: url("https://www.certonce.com/fonts/nitkkr/CloisterBlack.ttf") format("truetype");
        }
        @font-face {
          font-family:"dvttsurekh";
          src: url("https://www.certonce.com/fonts/nitkkr/DV-TTSurekh_Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"mangal";
          src: url("https://www.certonce.com/fonts/nitkkr/Mangal Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"shelleyallegro";
          src: url("https://www.certonce.com/fonts/nitkkr/Shelley Allegro BT.ttf") format("truetype");
        }
             
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="width: 100%;margin-top: 2px;margin-left: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
             </td>
             <td style="text-align: right;">
                 <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                 <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                 <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                 <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                 <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                 &nbsp;
                 <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
             </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template90e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"clibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}
        @font-face {
          font-family:"abbasi728";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-728.ttf") format("truetype");}
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasimitra";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Mitra-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblack";
          src: url("https://www.certonce.com/fonts/nitkkr/CloisterBlack.ttf") format("truetype");
        }
        @font-face {
          font-family:"dvttsurekh";
          src: url("https://www.certonce.com/fonts/nitkkr/DV-TTSurekh_Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"mangal";
          src: url("https://www.certonce.com/fonts/nitkkr/Mangal Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"shelleyallegro";
          src: url("https://www.certonce.com/fonts/nitkkr/Shelley Allegro BT.ttf") format("truetype");
        }
             
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   


   trailpart=`
   <table style="width: 100%;margin-top: 2px;margin-left: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
             </td>
             <td style="text-align: right;">
                 <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                 <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                 <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                 <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                 <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                 &nbsp;
                 <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
             </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template93e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        body {
          margin: 0px;
          padding: 0px;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"cardo";
          src: url("https://www.certonce.com/fonts/arfeenkhan/Cardo-Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"circular-std";
          src: url("https://www.certonce.com/fonts/arfeenkhan/CircularStd-Medium.ttf") format("truetype");
        }
        @font-face {
          font-family:"circular-std-book";
          src: url("https://www.certonce.com/fonts/arfeenkhan/Circular-Std-Book.ttf") format("truetype");
        }
        @font-face {
          font-family:"eb-garamond";
          src: url("https://www.certonce.com/fonts/arfeenkhan/EBGaramond-Medium.ttf") format("truetype");
        }
        @font-face {
          font-family:"pinyon-script";
          src: url("https://www.certonce.com/fonts/arfeenkhan/PinyonScript-Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"great-vibes";
          src: url("https://www.certonce.com/fonts/arfeenkhan/GreatVibes-Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"montserrat";
          src: url("https://www.certonce.com/fonts/arfeenkhan/Montserrat-Regular.ttf") format("truetype");
        } 
        @font-face {
          font-family:"poppins";
          src: url("https://www.certonce.com/fonts/arfeenkhan/Poppins-Regular.ttf") format("truetype");
        } 
        @font-face {
          font-family:"poppins-bold";
          src: url("https://www.certonce.com/fonts/arfeenkhan/Poppins-Bold.ttf") format("truetype");
        }               
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 10px;width: 100%;margin-top: 0px;margin-left: 0px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 18px;color: #fafbff;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/AK_Logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
             </td>
             <td style="text-align: right;">
                 <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                 <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                 <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                 <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                 <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                 &nbsp;
                 <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
             </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template94e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }           
      #template94e {           
        background-image: url("https://www.certonce.com/images/ABC Institute1.png");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }          
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`
    <table style="width: 100%;margin-top: -20px;margin-left: 0px; margin-bottom: -20px;">
      <tbody>
          <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">                  
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;                  
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
              </td>
          </tr>
      </tbody>
    </table>   
    </body>
    </html>
   `;
   html = html.replace(/VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template95e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
       
        @font-face {
          font-family:"Sapient Sans";
          src: url("https://www.certonce.com/fonts/spjimr/Sapient_Sans.ttf") format("truetype");}
          
        body
        {
          margin: 0px 0px 0px 0px;
        }
        #template95e {           
          background-image: url("https://www.certonce.com/images/SPJIMRPMIBackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 210mm;
        }  
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   if(html.indexOf("Corporate Finance Programme") !== -1) {
      // trailpart = `<table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
      //   <tbody>
      //     <tr>
      //       <td style="text-align: left;width: 1%;white-space: nowrap;"> 
      //           <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
      //       </td>                
      //       <td style="text-align: left;">     
      //           <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
      //       </td>       
      //     </tr>
      // </tbody>
      // </table>     
      // </body>
      // </html>`;
      trailpart = `</body></html>`;
    }
   }
   else if(templateid.indexOf("template98e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
       
        @font-face {
          font-family:"Sapient Sans";
          src: url("https://www.certonce.com/fonts/spjimr/Ascender_Serif_WGL_Regular.ttf") format("truetype");}
          
        body
        {
          margin: 0px 0px 0px 0px;
        }
        #template98e {           
          background-image: url("https://www.certonce.com/images/SPJIMRPMIBackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 210mm;
        }  
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   if(html.indexOf("Corporate Finance Programme") !== -1) {
      // trailpart = `<table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
      //   <tbody>
      //     <tr>
      //       <td style="text-align: left;width: 1%;white-space: nowrap;"> 
      //           <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
      //       </td>                
      //       <td style="text-align: left;">     
      //           <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
      //       </td>       
      //     </tr>
      // </tbody>
      // </table>     
      // </body>
      // </html>`;
      trailpart = `</body></html>`;
    }
   }
   else if(templateid.indexOf("template100e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
        #template100e-old {           
          background-image: url("https://www.certonce.com/images/NISM/nismbackground1.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 200mm;
        }  
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 270mm; margin-bottom: -45px; margin-top: 10px;margin-left: 45px">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template101e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
        #template101e {           
          background-image: url("https://www.certonce.com/images/newtranscriptbackground1.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 281mm;
        }  
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 187mm; margin-bottom: -45px; margin-top: -10px;margin-left: 45px">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template103e") != -1){
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }
        #template103e {           
          background-image: url("https://www.certonce.com/images/LJKU/ljkbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 295mm;
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   
    trailpart=`
    <table style="position: absolute; bottom: 45px;width: 85%;margin-top: 0px;margin-left: 55px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
              </td>
            </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
   }
   else if(templateid.indexOf("template104e") != -1){
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }            
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   
    trailpart=`
    <table style="position: absolute; bottom: 20px;width: 95%;margin-top: 0px;margin-left: 0px;margin-bottom: 0px;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;padding-left: 0px;"> 
            <span style="font-weight: bold;margin: 0px 10px;font-size: 15px;font-family: calibri;color: black;">Scan to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">                     
              <img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${verifyurl}" style="width: 40px;" /> 
          </td> 
          <td style="text-align: right;">
              <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
              <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
              <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
              <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
              <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
              &nbsp;
              <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
          </td>
        </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
   trailpart1=`
    <table style="position: absolute; bottom: 20px;width: 95%;margin-top: 0px;margin-left: 0px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/political.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
   }
   else if(templateid.indexOf("template105e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }
        @font-face {
          font-family:"poppinsmedium";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Medium.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinsright";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Light.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinssemibold";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-SemiBold.ttf") format("truetype");
        }
        @font-face {
            font-family:"krutidev40wide";
            src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 040 Wide Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev16thin";
          src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 016 Thin.ttf") format("truetype");
        }
        @font-face {
            font-family:"krishna";
              src: url("https://www.certonce.com/fonts/nitkkr/Krishna .ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasi728";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-728.ttf") format("truetype");
        }
          
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasimitra";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Mitra-Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblack";
          src: url("https://www.certonce.com/fonts/nitkkr/CloisterBlack.ttf") format("truetype");
        }
        @font-face {
          font-family:"cloisterblacklefty";
          src: url("https://www.certonce.com/fonts/nitkkr/Cloister_ Black-Light Lefty Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"dvttsurekh";
          src: url("https://www.certonce.com/fonts/nitkkr/DV-TTSurekh_Normal.ttf") format("truetype");
        }
        @font-face {
          font-family:"mangal";
          src: url("https://www.certonce.com/fonts/nitkkr/Mangal Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"shelleyallegro";
          src: url("https://www.certonce.com/fonts/nitkkr/Shelley Allegro BT.ttf") format("truetype");
        }
        @font-face {
          font-family:"rollin";
          src: url("https://www.certonce.com/fonts/nitkkr/A Rollin' 1 Regular.ttf") format("truetype");
        }    
        #template86e {           
          background-image: url("https://www.certonce.com/images/nitkkr_background.png");
        }           
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 5px;width: 100%;margin-top: 0px;margin-left: 0px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
             </td>
             <td style="text-align: right;">
                 <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                 <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                 <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                 <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                 <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                 &nbsp;
                 <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
             </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
  //  html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template106e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
        @font-face {
          font-family:"Sapient Sans";
          src: url("https://www.certonce.com/fonts/spjimr/Ascender_Serif_WGL_Regular.ttf") format("truetype");
        }
        #template106e-body {           
          background-image: url("https://www.certonce.com/images/SPJIMRPMIBackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 100%;
        }  
      </style>
      </head>
      <body id="template106e-body">  
   `;   
    trailpart=`
    <table style="width: 270mm; margin-bottom: -45px; margin-top: 0px;margin-left: 45px">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   if(html.indexOf("Corporate Finance Programme") !== -1) {
      // trailpart = `<table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
      //   <tbody>
      //     <tr>
      //       <td style="text-align: left;width: 1%;white-space: nowrap;"> 
      //           <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
      //       </td>                
      //       <td style="text-align: left;">     
      //           <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
      //       </td>       
      //     </tr>
      // </tbody>
      // </table>     
      // </body>
      // </html>`;
      trailpart = `</body></html>`;
    }
   }
   else if(templateid.indexOf("template194e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
        @font-face {
          font-family:"Sapient Sans";
          src: url("https://www.certonce.com/fonts/spjimr/Ascender_Serif_WGL_Regular.ttf") format("truetype");
        }
        #template194e-body {           
          background-image: url("https://www.certonce.com/images/SPJIMRPMIBackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 100%;
        }  
      </style>
      </head>
      <body id="template194e-body">  
   `;   
    trailpart=`
    <table style="width: 270mm; margin-bottom: -45px; margin-top: 0px;margin-left: 45px">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   if(html.indexOf("Corporate Finance Programme") !== -1) {
      // trailpart = `<table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
      //   <tbody>
      //     <tr>
      //       <td style="text-align: left;width: 1%;white-space: nowrap;"> 
      //           <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
      //       </td>                
      //       <td style="text-align: left;">     
      //           <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
      //       </td>       
      //     </tr>
      // </tbody>
      // </table>     
      // </body>
      // </html>`;
      trailpart = `</body></html>`;
    }
   }
   else if(templateid.indexOf("template107e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
        #template107e {           
          background-image: url("https://www.certonce.com/images/SPJIMRPMIBackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 180mm;
          height: 127mm;
        }  
      </style>
      </head>
      <body>  
   `;   
    trailpart=`
    <table style="width: 177mm; margin-bottom: -45px; margin-top: -45px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 12px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 22px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/share.png" style="width: 17px;" /></a> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 17px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 17px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 17px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 17px;" /></a>
            </td>
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   if(html.indexOf("Corporate Finance Programme") !== -1) {
      // trailpart = `<table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
      //   <tbody>
      //     <tr>
      //       <td style="text-align: left;width: 1%;white-space: nowrap;"> 
      //           <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
      //       </td>                
      //       <td style="text-align: left;">     
      //           <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
      //       </td>       
      //     </tr>
      // </tbody>
      // </table>     
      // </body>
      // </html>`;
      trailpart = `</body></html>`;
    }
   }
   else if(templateid.indexOf("template108e")!=-1 )
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
    <html xmlns="http://www.w3.org/1999/xhtml">
    <head>
    <meta content="zh-tw" http-equiv="Content-Language" />
    <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
    <title></title>
    <style>
    html {
     -webkit-print-color-adjust: exact;
    }
    @media print {
      body {-webkit-print-color-adjust: exact;}
      }
    @font-face {
      font-family:"BaroqueScript";
      src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");
    }
    @font-face {
      font-family:"abbasidamodar";
      src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
    }
    </style>
    <link href="https://fonts.googleapis.com/css2?family=Averia+Serif+Libre:wght@300&display=swap" rel="stylesheet">
    </head>
    <body style="background-repeat: repeat; background-image: url(&quot;${myip}/images/backend/enhelion_sub_1.png&quot;);" >    
   `;   

    trailpart=`     
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:0px 10px 5px 10px;">
    <table style="width: 99%;margin-top:0px;margin-bottom:0px;">
        <tbody>
            <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
                </td>
                <td style="text-align: right;">                    
                    <a href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&issueYear=${issuedyear}&issueMonth=${issuedmonth}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                      <img src="https://www.certonce.com/images/share.png" style="width: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="width: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="width: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="width: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="width: 25px;" /></a>
                </td>
            </tr>
        </tbody>
    </table>     
    <hr style="border: 1px solid cadetblue;background: cadetblue;margin:5px 10px 0px 10px;">
    </body>
    </html>
   `;
   }
   else if(templateid.indexOf("template109e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }                 
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 5px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;">
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/bennett/bennett_logo.png" style="height: 35px;" /></a>&nbsp;                                      
             </td>                
             <td style="text-align: left;">     
              <span style="margin: 0px 10px;font-size: 17px;">Click logo or scan QR to verify on Blockchain&nbsp;&nbsp;</span>                
             </td>
             <td style="text-align: right;">
                 <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                 <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                 <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                 <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                 <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                 &nbsp;
                 <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
             </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template110e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }                 
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   
    if( html.indexOf("SEMESTER 5") != -1)   {
      trailpart=`
      <table style="position: absolute; top: 2170px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
        <tbody>
              <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;">
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/bennett/bennett_logo.png" style="height: 35px;" /></a>&nbsp;                                      
                </td>                
                <td style="text-align: left;">     
                  <span style="margin: 0px 10px;font-size: 17px;">Click logo or scan QR to verify on Blockchain&nbsp;&nbsp;</span>                
                </td>
                <td style="text-align: right;">
                    <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
                </td>
              </tr>
        </tbody>
        </table>
        </body>
        </html>
      `;
    }
    else {
      trailpart=`
      <table style="position: absolute; bottom: 5px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
        <tbody>
              <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;">
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/bennett/bennett_logo.png" style="height: 35px;" /></a>&nbsp;                                      
                </td>                
                <td style="text-align: left;">     
                  <span style="margin: 0px 10px;font-size: 17px;">Click logo or scan QR to verify on Blockchain&nbsp;&nbsp;</span>                
                </td>
                <td style="text-align: right;">
                    <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                    <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                    <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                    <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                    <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                    &nbsp;
                    <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
                </td>
              </tr>
        </tbody>
        </table>
        </body>
        </html>
      `;
    }
   
   }
   else if(templateid.indexOf("template111e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        @font-face {
          font-family:"ailaitalic";
          src: url("https://www.certonce.com/fonts/skyline/Aila%20Regular%20Italic.otf") format("truetype");
        }
        @font-face {
          font-family:"Edwardian";
          src: url("https://www.certonce.com/fonts/Edwardian.ttf") format("truetype");
        }
        @font-face {
          font-family:"androgyne";
            src: url("https://www.certonce.com/fonts/chauru/androgyne (regular).otf") format("truetype");
        }
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
        #template111e-body {           
          background-image: url("https://www.certonce.com/images/skyline/skylinebackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 100%;
        }              
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template111e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 10px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
             </td>
             <td style="text-align: right;">
                 <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                 <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                 <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                 <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                 <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                 &nbsp;
                 <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
             </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template112e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        @font-face {
          font-family:"krutidev010regular";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev010condensed";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010CondensedRegular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
        #template112e-body {           
          background-image: url("${myip}/images/galgotiasbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 297mm;
        }              
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template112e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/Galgotias/Colored Logo D.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template163e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        @font-face {
          font-family:"krutidev010regular";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev010condensed";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010CondensedRegular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
       
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 12px; color: #ffffff;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 18px; margin-bottom: -2px; border: 3px solid #ffffff; border-radius: 50px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>

     
  `;
   }
   else if(templateid.indexOf("template159e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        @font-face {
          font-family:"krutidev010regular";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev010condensed";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010CondensedRegular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
        #template112e-body {           
          background-image: url("${myip}/images/galgotiasbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 297mm;
        }              
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute;left:180mm; top: 287mm;width: 90mm;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/certonce.png" style="width: 15px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template115e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 3px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 12px; color: #000;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 23px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template116e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        @font-face {
          font-family:"krutidev010regular";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev010condensed";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010CondensedRegular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        } 
        #template116e-body {           
          background-image: url("https://www.certonce.com/images/Galgotias/galgotiasgradecardbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 295mm;
        }              
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template116e-body">   
   `; 

  trailpart=`
   <table style="position: absolute; bottom: 25px;width: 95%;margin-top: 0px;margin-left: 20px;margin-bottom: 0px; text-align: left">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%; white-space: nowrap;"> 
                 <p style="margin: 0px 10px;font-size: 14px;">Click logo to verify on Blockchain</p>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 25px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template117e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
        #template117e-body {           
          background-image: url("${myip}/images/Galgotias/galgotiasmarksheetbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 295mm;
        }  
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template117e-body">   
   `;   

   trailpart1=`
   <table style="position: absolute; bottom: 5px;width: 100%;margin-top: 0px;margin-right: 0px;margin-bottom: 0px; text-align: right">
   <tbody>
         <tr>
            <td style="text-align: right;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain</span>                    
            </td>                
            <td style="text-align: right;width: 1%;">     
              <a href="${verifyurl}"><img src="${myip}/images/Galgotias/Colored Logo D.png" style="width: 35px; margin-top: 20px; margin-right: 35px;" /></a>&nbsp;&nbsp;                    
            </td>
         </tr>
   </tbody>
   </table>
   </body>
   </html>
    `;
    trailpart=`
    <table style="position: absolute; bottom: 5px;width: 100%;margin-top: 0px;margin-left: 10px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/Galgotias/Colored Logo D.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
              </td>             
            </tr>
      </tbody>
      </table>
      </body>
      </html>
    `;
   }
   else if(templateid.indexOf("template118e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
          font-family:"monotype";
          src: url("${myip}/fonts/Monotype Corsiva.ttf") format("truetype");
        }
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=`
      <table style="position: absolute; bottom: 5px;width: 100%;margin-top: 0px;margin-left: 10px;margin-bottom: 0px;">
        <tbody>
              <tr>
                <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                    <span style="margin: 0px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
                </td>                
                <td style="text-align: left;">     
                    <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 35px;" /></a>&nbsp;&nbsp;                    
                </td>             
              </tr>
        </tbody>
        </table>
        </body>
        </html>
      `;
   }
   else if(templateid.indexOf("template119e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        @font-face {
          font-family:"taurus";
          src: url("${myip}/fonts/TaurusRegular.otf") format("truetype");
        }
        @font-face {
          font-family:"pinyonscript";
          src: url("${myip}/fonts/PinyonScript-Regular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
        #template119e-body {           
          background-image: url("${myip}/images/Princeton/princetonfront.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 208mm;
        }     
           
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template119e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
             </td>
             <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
              </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template120e")!=-1)
   {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
       -webkit-print-color-adjust: exact;
       min-height: 100%;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
        font-family:"BaroqueScript";
        src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        body
        {
          margin: 0px 0px 0px 0px;
        }
        #template120e-body {           
          background-image: url("https://www.certonce.com/images/SPJIMRPMIBackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 100%;
        }  
      </style>
      </head>
      <body id="template120e-body">  
   `;   
    trailpart=`
    <table style="position: absolute; bottom: 5px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 17px;">Scan QR code to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
              <img src="https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl=${verifyurl}" style="width: 40px;" />                  
            </td>            
          </tr>
      </tbody>
    </table>     
    </body>
    </html>
   `;
   if(html.indexOf("Corporate Finance Programme") !== -1) {
      // trailpart = `<table style="width: 270mm; margin-bottom: -45px; margin-top: -55px;margin-left: 45px">
      //   <tbody>
      //     <tr>
      //       <td style="text-align: left;width: 1%;white-space: nowrap;"> 
      //           <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
      //       </td>                
      //       <td style="text-align: left;">     
      //           <a href="${verifyurl}"><img src="https://www.certonce.com/images/spjimr_pmi.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
      //       </td>       
      //     </tr>
      // </tbody>
      // </table>     
      // </body>
      // </html>`;
      trailpart = `</body></html>`;
    }
   }
  else if( templateid.indexOf("template121e")!=-1 || templateid.indexOf("template172e")!=-1 ) {
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
      } 
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>`;
    if ( templateid.indexOf("template172e") != -1 ) {
      trailpart=`<table style="position: absolute; bottom: 7px;width: 100%;">
      <tbody>
        <tr>
          <td style="white-space: nowrap;display: flex;align-items: center;justify-content: left;">
            <span style="font-size: 12px;">Click logo to verify on Blockchain&nbsp;</span>
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 20px;" /></a>
          </td>             
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    } else {
      trailpart=`<table style="position: absolute; top: 20mm; left: 15.1mm;">
      <tbody>
        <tr>
          <td style="white-space: nowrap;display: flex;align-items: center;justify-content: center;">
            <span style="font-size: 12px;">Click logo to verify on Blockchain&nbsp;</span>
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 20px;" /></a>
          </td>             
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    }
  }
   else if(templateid.indexOf("template122e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }
        @font-face {
          font-family:"centurygothic";
          src: url("https://www.certonce.com/fonts/miet/CenturyGothic.ttf") format("truetype");
        }
        @font-face {
          font-family:"chopinscript";
          src: url("https://www.certonce.com/fonts/miet/ChopinScript.ttf") format("truetype");
        } 
        @font-face {
          font-family:"impact";
          src: url("https://www.certonce.com/fonts/miet/impact.ttf") format("truetype");
        }
        @font-face {
          font-family:"vijaya";
          src: url("https://www.certonce.com/fonts/miet/vijaya.ttf") format("truetype");
        }       
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
        #template122e-body{           
          background-image: url("https://www.certonce.com/images/miet/mietbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 297mm;
          height: 205mm;
        }              
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template122e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 100%;margin-top: 0px;margin-left: 5px;margin-bottom: 0px;">
     <tbody>
           <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;">
              <span style="margin: 0px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;&nbsp;</span>     
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/miet/mietlogo.png" style="height: 35px;" /></a>&nbsp;                                                 
            </td>
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template123e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }                 
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   
    trailpart=`
      <table style="position: absolute; top: 10px;width: 100%;margin-top: 0px;margin-right: 20px;margin-bottom: 0px; text-align: right; right: 0;">
        <tbody>
          <tr>
            <td style="text-align: right; white-space: nowrap;">
              <p style="font-size: 8pt; margin-top: -10px;">Click logo to verify on Blockchain</span>     
            </td>                
            <td style="text-align: right; width: 1%;">
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/miet/mietlogo.png" style="height: 30px;" /></a>&nbsp;                                                 
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>
      `;   
   }
    else if(templateid.indexOf("template124e")!=-1 ) {
      let qr_code = await getQRwithbase64(verifyurl, 300);
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
      } 
      @font-face {
        font-family:"arial";
        src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
      }        
      @font-face {
        font-family:"timesnewroman";
        src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
      }
      @font-face {
        font-family:"micrenc";
        src: url("https://www.certonce.com/fonts/ljk/micrenc.ttf") format("truetype");
      }
      @font-face {
        font-family:"helvetica";
        src: url("https://www.certonce.com/fonts/sbup/Helvetica-Bold-Font.ttf") format("truetype");
      }
      #template124e_old {           
        background-image: url("https://www.certonce.com/images/LJKU/newbackground.png");
        background-repeat: no-repeat;
        background-size: cover;
        width: 210mm;
        height: 295mm;
      }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
      <p style="position:absolute;top:982.5px;left:220px;z-index:19;font-size:12px;">${student['subother3']}</p>`;
      if(student['subother2']=="current" || student['subother2']=="alumni") {
        trailpart=`<table style="position: absolute; bottom: 50px;width: 85%; margin: auto; left: 0; right: 0;">
          <tbody>
            <tr>
              <td style="text-align: left; white-space: nowrap; width: 1%;">
                <p style="font-size: 10pt; margin-top: -5px;">Click logo to verify on Blockchain</span>     
              </td>                
              <td style="text-align: left;">
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/LJKU/logoljk (2).png" style="height: 30px; margin-top: -5px;" /></a>&nbsp;                                                 
              </td>
            </tr>
          </tbody>
          </table>
          </body>
          </html>`;
      }
      else {
        trailpart=`<table style="position: absolute;width: 85%;top:265mm;left:15mm;">
          <tbody>
            <tr>
              <td style="text-align: left; white-space: nowrap; width: 1%;">
                <p style="font-size: 10pt; margin-top: -5px;">Click logo to verify on Blockchain</span>     
              </td>                
              <td style="text-align: left;">
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/LJKU/logoljk (2).png" style="height: 18px;position: relative;top: -5px;" /></a>&nbsp;                                                 
              </td>
            </tr>
          </tbody>
          </table>
          </body>
          </html>`;
      }
    }
   else if(templateid.indexOf("template125e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"poppinsmedium";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Medium.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinsright";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-Light.ttf") format("truetype");
        }
        @font-face {
          font-family:"poppinssemibold";
          src: url("https://www.certonce.com/fonts/nitkkr/Poppins/Poppins-SemiBold.ttf") format("truetype");
        }
        @font-face {
            font-family:"krutidev40wide";
            src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 040 Wide Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev16thin";
          src: url("https://www.certonce.com/fonts/nitkkr/Kruti Dev 016 Thin.ttf") format("truetype");
        }
        @font-face {
            font-family:"krishna";
              src: url("https://www.certonce.com/fonts/nitkkr/Krishna .ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }   
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
        @font-face {
          font-family:"abbasidamodar";
          src: url("https://www.certonce.com/fonts/nitkkr/Abbasi-Damodar-Normal.ttf") format("truetype");
        }        
        @font-face {
          font-family:"andalus";
          src: url("https://www.certonce.com/fonts/nitkkr/andlso.ttf") format("truetype");
        }        
        @font-face {
          font-family:"mangal";
          src: url("https://www.certonce.com/fonts/nitkkr/Mangal Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"shelleyallegro";
          src: url("https://www.certonce.com/fonts/nitkkr/Shelley Allegro BT.ttf") format("truetype");
        }
        @font-face {
          font-family:"rollin";
          src: url("https://www.certonce.com/fonts/nitkkr/A Rollin' 1 Regular.ttf") format("truetype");
        }  
        @font-face {
          font-family:"chanc";
          src: url("${myip}/fonts/manav/chanc___.ttf") format("truetype");
        }   
        #template125e {           
          background-image: url("${myip}/images/manav/watermark.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 207mm;
          height: 295mm;
        }         
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart=` 
    <table style="position: absolute; bottom: 5px;width: 90%; margin: auto; left: 0; right: 0;">
      <tbody>
        <tr>
          <td style="text-align: left; white-space: nowrap; width: 1%;">
            <p style="font-size: 12pt; margin-top: -5px;">Click logo to verify on Blockchain</span>     
          </td>                
          <td style="text-align: left;">
            <a href="${verifyurl}"><img src="${myip}/images/manav/manav_logo.png" style="height: 40px; margin-top: -20px;" /></a>&nbsp;                                                 
          </td>
        </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
   html = html.replace(/LOGO_VERIFY_URL/g, verifyurl);
   }
   else if(templateid.indexOf("template126e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }      
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 85%;margin-top: 0px;margin-left: 75px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 12px; color: #000000;">Click logo to verify on Blockchain</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/manav/manav_logo.png" style="width: 18px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template127e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
   <tbody>
         <tr>
           <td style="text-align: left;width: 1%;white-space: nowrap;"> 
               <span style="margin: 0px 10px;font-size: 17px;">Click logo to verify on Blockchain&nbsp;</span>                    
           </td>                
           <td style="text-align: left;">     
               <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
           </td>
           <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
            </td>
         </tr>
   </tbody>
   </table>
   </body>
   </html>
  `;
   }   
   else if(templateid.indexOf("template128e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }       
        .teacher td {
          padding: 5px 5px;
          white-space: nowrap;
        }
        .teacher
        {
          border-collapse: collapse;
        } 
        table {
          margin-top: 20px;
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   
   trailpart=`
   <table style="position: absolute; top: 30px; margin-left: 700px; width: 50%; ">
       <tbody>
         <tr>
           <td style="text-align: left;width: 1%;white-space: nowrap;"> 
               <span style="margin: 0px 10px;font-size: 17px;">Click on logo to verify on Blockchain&nbsp;</span>                    
           </td>                
           <td style="text-align: left;">     
               <a href="${verifyurl}"><img src="https://www.certonce.com/images/LJKU/logoljk (2).png" style="width: 50px;" /></a>&nbsp;&nbsp;                    
           </td>
         </tr>
     </tbody>
   </table>     
   </body>
   </html>
  `;
   }
   else if(templateid.indexOf("template129e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
      @font-face {
        font-family:"timesnewroman";
        src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
      }        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
        <tr>
        <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
        </td>                
        <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
        </td>
        <td style="text-align: right;">
            <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
            <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
            <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
            <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
            <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
            &nbsp;
            <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
        </td>
      </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template130e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
      @font-face {
        font-family:"calibri";
        src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
      }  
      @font-face {
        font-family:"cambria";
        src: url("${myip}/fonts/cutm/Cambria.ttf") format("truetype");
      }
      @font-face {
        font-family:"vivaldi";
        src: url("${myip}/fonts/cutm/VIVALDII.TTF") format("truetype");
      }
      #template130e-body{
        background-image: url('${myip}/images/CUTM/template130background.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }  
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template130e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
        <tr>
        <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
        </td>                
        <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
        </td>        
      </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
    html = html.replace("PRINT_CODE", "");
   }
   else if(templateid.indexOf("template130goldmerit")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
      @font-face {
        font-family:"calibri";
        src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
      }  
      @font-face {
        font-family:"cambria";
        src: url("${myip}/fonts/cutm/Cambria.ttf") format("truetype");
      }
      @font-face {
        font-family:"vivaldi";
        src: url("${myip}/fonts/cutm/VIVALDII.TTF") format("truetype");
      }
      #template130e-body{
        background-image: url('${myip}/images/CUTM/template130background11.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }  
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template130e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
        <tr>
        <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
        </td>                
        <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
        </td>        
      </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
    html = html.replace("PRINT_CODE", "");
   }
   else if(templateid.indexOf("template131e_landscape")!=-1)
   {
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"arial";
              src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
            }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
            }
            @font-face {
              font-family:"kartikab";
              src: url("${myip}/fonts/cutm/kartikab.ttf") format("truetype");
            }
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body> 
    `;
    trailpart=`
    <table style="position: absolute; top: 755px;width: 90%;margin-top: 0px;margin-left: 30px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 25px; margin-bottom: 0px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
    let font_size_1 = '9pt';
    let font_size_2 = '12pt';
    let signature1 = `${myip}/images/CUTM/cutm_checkedby.png`;
    let signature2 = `${myip}/images/CUTM/cutm_dy_director.png`;
    let signature3 = `${myip}/images/CUTM/cutm_director.png`;
    let sub_part = `<tr>
    <td style="width: 33%; text-align: center;"><img style="height: 40px; margin-bottom: 0px;" src="${signature1}" /></td>
    <td style="width: 34%; text-align: center;"><img style="height: 40px; margin-bottom: 0px;" src="${signature2}" /></td>
    <td style="width: 33%; text-align: center;"><img style="height: 40px; margin-bottom: 0px;" src="${signature3}" /></td>
    </tr>
    <tr>
    <td style="width: 33%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Checked by</td>
    <td style="width: 34%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Dy. Director (E&QA)</td>
    <td style="width: 33%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Director (E&QA)</td>
    </tr>`;
    let subpart1 = `<table style="width: 90%; margin-top: 30px; margin-left: 10px;"><tbody>
      ${sub_part}
      <tr>
      <td colspan="3" style="font-size: ${font_size_1}; font-style: italic; font-family: arial; font-weight: bold;">
      <p style="margin-top: 10px;">Note : 1. O = 10 (>=90), E = 9 (80-89), A = 8 (70-79), B = 7 (60-69), C = 6 (50-59), D = 5 (40-49), F = 2 (<40)</p>
      <p style="margin-left: 38px;">2. Percentage of Marks = CGPA x 10</p>
      </td>
      </tr>
      </tbody><table>
    </div>`;
    let subpart2 = `<table style="width: 90%; margin-top: 30px; margin-left: 10px;"><tbody>
    ${sub_part}
      <tr>
      <td colspan="3" style="width: 1000%; text-align: left; font-size: ${font_size_1};">
      <p style="margin-top: 20px; font-family: arial;">1. AECC :: Ability Enhancement Compulsory Course</p>
      <p style="margin-top: 3px; font-family: arial;">2. SEC :: Skill Enhancement Course</p>
      <p style="margin-top: 3px; font-family: arial;">3. CORE :: Core Course</p>
      <p style="margin-top: 3px; font-family: arial;">4. GE :: Generic Elective Course</p>
      <p style="margin-top: 3px; font-family: arial;">5. DOMAIN :: Domain Subject</p>
      </td>      
      </tr>
      <tr>
      <td colspan="3" style="font-size: ${font_size_1}; font-style: italic; font-family: arial; font-weight: bold;">
      <p style="margin-top: 15px;">Note : 1. O = 10 (>=90), E = 9 (80-89), A = 8 (70-79), B = 7 (60-69), C = 6 (50-59), D = 5 (40-49), F = 2 (<40)</p>
      <p style="margin-left: 38px;">2. Percentage of Marks = CGPA x 10</p>
      </td>
      </tr>
      </tbody><table>
    </div>`;
    let subpart3 = `<table style="width: 90%; margin-top: 5px; margin-left: 10px;"><tbody>
    ${sub_part}
      <tr>
      <td colspan="3" style="font-size: ${font_size_1}; font-style: italic; font-family: arial; font-weight: bold;">
      <p style="margin-top: 5px;">Note : 1. O = 10 (>=90), A = 9 (80-89), B = 8 (70-79), C = 7 (60-69), D = 6 (50-59), E = 0 (<50)</p>
      <p style="margin-left: 38px;">2. Percentage of Marks = CGPA x 10</p>
      </td>
      </tr>
      </tbody><table>
    </div>`;
    let subpart4 = `<table style="width: 90%; margin-top: 30px; margin-left: 10px;"><tbody>
    ${sub_part}
      <tr>
      <td colspan="3" style="font-size: ${font_size_1}; font-style: italic; font-family: arial; font-weight: bold;">
      <p style="margin-top: 15px;">Note : 1. O = 10 (>=90), E = 9 (80-89), A = 8 (70-79), B = 7 (60-69), C = 6 (50-59), D = 5 (35-49), F = 2 (<35)</p>
      <p style="margin-left: 38px;">2. Percentage of Marks = CGPA x 10</p>
      </td>
      </tr>
      </tbody><table>
    </div>`;
    let subpart5 = `<table style="width: 90%; margin-top: 10px; margin-left: 10px;"><tbody>
    <tr>
    <td style="width: 33%; text-align: center;"><img style="height: 40px; margin-bottom: -10px;" src="${signature1}" /></td>
    <td style="width: 34%; text-align: center;"><img style="height: 40px; margin-bottom: -10px;" src="${signature2}" /></td>
    <td style="width: 33%; text-align: center;"><img style="height: 40px; margin-bottom: -10px;" src="${signature3}" /></td>
    </tr>
    <tr>
    <td style="width: 33%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Checked by</td>
    <td style="width: 34%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Dy. Director (E&QA)</td>
    <td style="width: 33%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Director (E&QA)</td>
    </tr>     
      </tbody><table>
    </div>`;
    html = html.replace("SUB_REPLACE_PART_1", subpart1);
    html = html.replace("SUB_REPLACE_PART_2", subpart2);
    html = html.replace("SUB_REPLACE_PART_3", subpart3);
    html = html.replace("SUB_REPLACE_PART_4", subpart4);
    html = html.replace("SUB_REPLACE_PART_5", subpart5);
   }
   else if(templateid.indexOf("template131e_portrait")!=-1)
   {
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"arial";
              src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
            } 
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
            @font-face {
              font-family:"kartikab";
              src: url("${myip}/fonts/cutm/kartikab.ttf") format("truetype");
            }
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body> 
    `;
    trailpart=`
    <table style="position: absolute; bottom: 1120px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;   
    
    let font_size_1 = '12pt';
    let font_size_2 = '8pt';
    let font_size_3 = '10pt';
    let line_height = '15pt';
    let signature1 = `${myip}/images/CUTM/cutm_checkedby.png`;
    let signature2 = `${myip}/images/CUTM/cutm_dy_director.png`;
    let signature3 = `${myip}/images/CUTM/cutm_director.png`;
    let sub_part = `<tr>
    <td style="width: 33%; text-align: center;"><img style="height: 40px; margin-bottom: -5px;" src="${signature1}" /></td>
    <td style="width: 34%; text-align: center;"><img style="height: 40px; margin-bottom: -5px;" src="${signature2}" /></td>
    <td style="width: 33%; text-align: center;"><img style="height: 40px; margin-bottom: -5px;" src="${signature3}" /></td>
    </tr>
    <tr>
    <td style="width: 33%; text-align: center; font-size: ${font_size_1}; font-family: kartikab;">Checked by</td>
    <td style="width: 34%; text-align: center; font-size: ${font_size_1}; font-family: kartikab;">Dy. Director (E&QA)</td>
    <td style="width: 33%; text-align: center; font-size: ${font_size_1}; font-family: kartikab;">Director (E&QA)</td>
    </tr>`;
    let subpart1 =`<table style="width: 80%; margin-top: 30px; margin-left: 10px;"><tbody>
    ${sub_part}
    </tbody><table>
    <table style="width: 85%; margin-top: 15px; margin-left: 10px;"><tbody>
    <tr>
    <td style="width: 3%; text-align: center; font-size: ${font_size_3}; font-family: kartikab; vertical-align: top;">Note&nbsp;:&nbsp;</td>
    <td style="width: 97%; text-align: center; font-size: ${font_size_3}; font-family: kartikab;">
      <table style="width: 90%; border-collapse: collapse;"><tbody>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">Classification in 10 Point Scale</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 100 Marks</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">GPA: Grade Point Average</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">First Class with Distinction</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 8.00 & above</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">OGPA: Overall Grade Point Average</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">First Class</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 7.00 to 7.99</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">TH: Theory Hours per week</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">Second Class</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 6.00 to 6.99</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">PR/PJ: Practical/Project Hours per week</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">Pass</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 5.00 to 5.99</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">*CNC : Compulsory Non Credit Course</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">Percentage of Marks</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; OGPA x 10</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">S: Satisfactory, NS:Not Satisfactory</td>
        </tr>
      </tbody></table>
    </td>    
    </tr>        
    </tbody><table>
    </div>`;

    let subpart2 =`<table style="width: 80%; margin-top: 30px; margin-left: 10px;"><tbody>
    ${sub_part}
    </tbody><table>
    <table style="width: 85%; margin-top: 15px; margin-left: 10px;"><tbody>
    <tr>
    <td style="width: 3%; text-align: center; font-size: ${font_size_3}; font-family: kartikab; vertical-align: top;">Note&nbsp;:&nbsp;</td>
    <td style="width: 97%; text-align: center; font-size: ${font_size_3}; font-family: kartikab;">
      <table style="width: 90%; border-collapse: collapse;"><tbody>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Classification in 10 Point Scale</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 100 Marks</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">GPA: Grade Point Average</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">First Class with Distinction</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 8.00 & above</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">OGPA: Overall Grade Point Average</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">First Class</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 7.00 to 7.99</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">TH: Theory Hours per week</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Second Class</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 6.00 to 6.99</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">PR/PJ: Practical/Project Hours per week</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Pass</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 5.00 to 5.99</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">*R:Remedial Course, **NC:Non-Gradial Course</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Percentage of Marks</td>
        <td style="width: 17%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; OGPA x 10</td>
        <td style="width: 50%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">S: Satisfactory, NS:Not Satisfactory</td>
        </tr>
      </tbody></table>
    </td>    
    </tr>        
    </tbody><table>
    </div>`;

    let subpart3 =`<table style="width: 80%; margin-top: 30px; margin-left: 10px;"><tbody>
    ${sub_part}
    </tbody><table>
    <table style="width: 85%; margin-top: 15px; margin-left: 10px;"><tbody>
    <tr>
    <td style="width: 3%; text-align: center; font-size: ${font_size_3}; font-family: kartikab; vertical-align: top;">Note&nbsp;:&nbsp;</td>
    <td style="width: 97%; text-align: center; font-size: ${font_size_3}; font-family: kartikab;">
      <table style="width: 90%; border-collapse: collapse;"><tbody>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Classification in 10 Point Scale</td>
        <td style="width: 22%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 100 Marks</td>
        <td style="width: 45%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">GPA : Grade Point Average</td>
        </tr>        
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">First Class</td>
        <td style="width: 22%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 7.00 & above</td>
        <td style="width: 55%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">OGPA : Overall Grade Point Average</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Second Class</td>
        <td style="width: 22%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; 6.00 to 6.99</td>
        <td style="width: 45%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">NC : Non Credit Course</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Fail</td>
        <td style="width: 22%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; Less than 6.00</td>
        <td style="width: 45%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">SUPP : Supporting Course</td>
        </tr>
        <tr style="line-height: ${line_height};">
        <td style="width: 33%; border-left: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">Percentage of Marks</td>
        <td style="width: 22%; border-right: 1px solid black; border-top: 1px solid black; border-bottom: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab;">:&nbsp;&nbsp; OGPA x 10</td>
        <td style="width: 45%; border: 1px solid black; text-align: left; font-size: ${font_size_2}; font-family: kartikab; padding-left: 3px;">S: Satisfactory, NS:Not Satisfactory</td>
        </tr>
      </tbody></table>
    </td>    
    </tr>        
    </tbody><table>
    </div>`;
    html = html.replace("SUB_REPLACE_PART_1", subpart1);
    html = html.replace("SUB_REPLACE_PART_2", subpart2);
    html = html.replace("SUB_REPLACE_PART_3", subpart3);
    html = html.replace(/PORTRAIT_FIRST_LINE_HEIGHT/g, '40px');
   }
   else if(templateid.indexOf("template132e")!=-1)
   {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
            font-family:"bookmanoldstyle";
            src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
            font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }  

      #template132e {           
        background-image: url("https://www.certonce.com/images/NDIM/hardcopytranscriptbackground.jpg");
        background-repeat: no-repeat;
        background-size: 100% 100%;
      }          
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

    trailpart1=`
    <table style="width: 100%;margin-top: -50px;margin-left: 0px; margin-bottom: -10px;">
      <tbody>
          <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
              </td>
          </tr>
      </tbody>
    </table>   
    </body>
    </html>
   `;

   trailpart=`
    <table style="width: 96%; position: absolute; top: 2195px;">
      <tbody>
          <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 30px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
              </td>
          </tr>
      </tbody>
    </table>   
    </body>
    </html>
   `;
  //  html = html.replace("NDIM_SECOND_BACK", "https://www.certonce.com/images/NDIM/ndimdigitalsecond.png");
   }
   else if(templateid.indexOf("template133e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }
        @font-face {
          font-family:"monotype";
          src: url("https://www.certonce.com/fonts/Monotype Corsiva.ttf") format("truetype");
        }
        
        @font-face {
          font-family:"clarendon";
          src: url("https://www.certonce.com/fonts/ljk/ClarendonBTRoman.ttf") format("truetype");
        }
        @font-face {
          font-family:"zapped";
          src: url("https://www.certonce.com/fonts/ljk/ZappedChancellor_MedItalicSH.ttf") format("truetype");
        }
        #template133e {           
          background-image: url("https://www.certonce.com/images/LJKU/LJK_MBA_Background.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 295mm;
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   
    trailpart=`
      <table style="position: absolute; bottom: 5px;width: 85%; margin: auto; left: 0; right: 0;">
        <tbody>
          <tr>
            <td style="text-align: left; white-space: nowrap; width: 1%;">
              <p style="font-size: 12pt; margin-top: -5px;">Click logo to verify on Blockchain</span>     
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/LJKU/logoljk (2).png" style="height: 40px; margin-top: -5px;" /></a>&nbsp;                                                 
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>
      `;   
    html = html.replace("PRINT_CODE", `<table style="width: 100%; height: 70px; padding-top: 20px;"><tbody><tr><td style="text-align: left;  padding-left: 60px;">
    <img src="data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==" style="width: 70px; margin-right: 85px;" />                                                
    </td></tr></tbody></table>`);
   }
   else if(templateid.indexOf("template134e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 5px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 14px; ">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/LJKU/logoljk (2).png" style="width: 30px; margin-bottom: -2px; border: 3px solid #ffffff; border-radius: 50px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   html = html.replace('PRINT_CODE', 'data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==')
   }
   else if(templateid.indexOf("template135e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }                         
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 3px;width: 95%;margin-top: 0px;margin-left: 10px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 22px; margin-bottom: -5px; " /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;  
   }   
  else if(templateid.indexOf("template136e")!=-1 ||templateid.indexOf("template137e")!=-1 ) {
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
          font-family:"krutidev010regular";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev010condensed";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010CondensedRegular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
        #template136e-body {           
          background-image: url("${myip}/images/MEDI/template136digitalbackground.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 8.4in;
          height: 11.7in;
        }              
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template136e-body">`;
    trailpart=`<table style="position: absolute; bottom: 8px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 13px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="${myip}/images/MEDI/medi_logo.png" style="width: 27px;" /></a>&nbsp;&nbsp;                    
          </td>
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    html = html.replace("PRINT_CODE", "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
    if(templateid.indexOf("template137e")!=-1){
      headerpart = headerpart.replace("11.8in", "11.7in");
    }
  }
   else if(templateid.indexOf("template185e")!=-1 || templateid.indexOf("template187e")!=-1 || templateid.indexOf("template189e")!=-1 || templateid.indexOf("template190e")!=-1) {
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }
      @font-face {
        font-family:"krutidev010regular";
        src: url("${myip}/fonts/gjust/KrutiDev010Regular.ttf") format("truetype");
      }
      @font-face {
        font-family:"algerian";
        src: url("${myip}/fonts/gjust/AlgerianBasD.ttf") format("truetype");
      }  
      @font-face {
        font-family:"zapfc";
        src: url("${myip}/fonts/gjust/zapfcalligr-bt-3.ttf") format("truetype");
      }       
      @font-face {
        font-family:"timesnewroman";
        src: url("${myip}/fonts/gjust/timesnewroman.ttf") format("truetype");
      }   
      @font-face {
        font-family:"calibri";
        src: url("${myip}/fonts/gjust/calibri.ttf") format("truetype");
      } 
      @font-face {
        font-family:"timesnewromanitalic";
        src: url("${myip}/fonts/gjust/timesnewromanitalic.ttf") format("truetype");
      }
      @font-face {
        font-family:"oldenglish";
        src: url("${myip}/fonts/gjust/oldenglishtextmt.ttf") format("truetype");
      } 
      @font-face {
        font-family:"bankgothicmd";
        src: url("${myip}/fonts/gjust/BankGthd.ttf") format("truetype");
      }                      
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>`;
    trailpart=`<table style="position: absolute; top: 10mm; width: 95%;margin-top: 0px;margin-left: 35px; margin-bottom: 0px;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 13px;">Click logo to verify on Blockchain</span>                    
          </td>                
          <td style="text-align: left;">     
              <a href="${verifyurl}/"><img src="${myip}/images/Gjust/Gjust_logo.png" style="width: 27px;" /></a>&nbsp;&nbsp;                    
          </td>
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    html = html.replace("PRINT_CODE", "data:image/gif;base64,R0lGODlhAQABAAAAACH5BAEKAAEALAAAAAABAAEAAAICTAEAOw==");
  }
   else if(templateid.indexOf("template138e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
      }         
      @font-face {
        font-family:"calibri";
        src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
      }  
      @font-face {
        font-family:"cambria";
        src: url("${myip}/fonts/cutm/Cambria.ttf") format("truetype");
      }
      #template138e-body{
        background-image: url('${myip}/images/CUTM-AP/template138background.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }  
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template138e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
        <tr>
        <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
        </td>                
        <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
        </td>        
      </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
    html = html.replace("PRINT_CODE", "");
   }
   else if(templateid.indexOf("template139e")!=-1)
   {
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
        @font-face {
          font-family:"arial";
          src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
        }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
            }
            @font-face {
              font-family:"kartikab";
              src: url("${myip}/fonts/cutm/kartikab.ttf") format("truetype");
            }
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body> 
    `;
    trailpart=`
    <table style="position: absolute; bottom: 790px;width: 90%;margin-top: 0px;margin-left: 30px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 25px; margin-bottom: 0px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
    let font_size_1 = '10pt';
    let font_size_2 = '12pt';
    
    let subpart1 = `<table style="width: 90%; margin-top: 30px; margin-left: 10px;"><tbody>
      <tr>
      <td style="width: 25%; text-align: center;"><img style="height: 40px;" src="${myip}/images/backend/empty.png" /></td>
      <td style="width: 25%; text-align: center;"><img style="height: 40px;" src="${myip}/images/backend/empty.png" /></td>
      <td style="width: 25%; text-align: center;"><img style="height: 40px;" src="${myip}/images/backend/cutm_ap_dean_examinations.png" /></td>
      <td style="width: 25%; text-align: center;"><img style="height: 35px;" src="${myip}/images/backend/cutm_ap_registrar_digita.png" /></td>
      </tr>
      <tr>
      <td style="width: 25%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Prepared by</td>
      <td style="width: 25%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Checked by</td>
      <td style="width: 25%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Dean - Examinations</td>
      <td style="width: 25%; text-align: center; font-size: ${font_size_2}; font-family: kartikab;">Registrar</td>
      </tr>
      <tr>
      <td colspan="4" style="font-size: ${font_size_1}; font-style: italic; font-family: arial;">
      <p style="margin-top: 20px;">Note : 1. O = 10 (90-100), E = 9 (80-89), A = 8 (70-79), B = 7 (60-69), C = 6 (50-59), D = 5 (40-49), F = 2 (<40)</p>
      <p style="margin-left: 38px; margin-top: 10px;">2. Percentage of Marks = CGPA x 10</p>
      </td>
      </tr>
      </tbody><table>
    </div>`;
    
    html = html.replace("SUB_REPLACE_PART", subpart1);
   
   }
   else if(templateid.indexOf("template140e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
      @font-face {
        font-family:"alegreya";
        src: url("https://www.certonce.com/fonts/gcu/Alegreya-Regular.ttf") format("truetype");
      }  
      @font-face {
        font-family:"aparajita";
        src: url("https://www.certonce.com/fonts/gcu/aparaj.ttf") format("truetype");
      }
      @font-face {
        font-family:"courier";
        src: url("https://www.certonce.com/fonts/gcu/cour.ttf") format("truetype");
      }
      #template140e-body{
        background-image: url('${myip}/images/GCU/template140backgrounddigital.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }  
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template140e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
        <tr>
        <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
        </td>                
        <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/GCU/gcu_logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
        </td>        
      </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
    html = html.replace("PRINT_TEXT", "");
    html = html.replace("PRINT_CODE", `${myip}/images/backend/empty.png`);
   }
   else if(templateid.indexOf("template195e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
      @font-face {
        font-family:"alegreya";
        src: url("https://www.certonce.com/fonts/gcu/Alegreya-Regular.ttf") format("truetype");
      }  
      @font-face {
        font-family:"aparajita";
        src: url("https://www.certonce.com/fonts/gcu/aparaj.ttf") format("truetype");
      }
      @font-face {
        font-family:"courier";
        src: url("https://www.certonce.com/fonts/gcu/cour.ttf") format("truetype");
      }
      #template195e-body{
        background-image: url('${myip}/images/GCU/template140backgrounddigital.png');
        background-repeat: no-repeat;
        background-size: cover;
        width: 100%;
        height: 100%;
      }  
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template195e-body">   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
        <tr>
        <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
        </td>                
        <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/GCU/gcu_logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
        </td>        
      </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
    html = html.replace("PRINT_TEXT", "");
    html = html.replace("PRINT_CODE", `${myip}/images/backend/empty.png`);
   }
   else if(templateid.indexOf("template141e")!=-1)
   {     
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
            }
            #template141e-body {           
              background-image: url("${myip}/images/IILM/template141background.png");
              background-repeat: no-repeat;
              background-size: cover;
              width: 210mm;
            }
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body id="template141e-body"> 
    `;

    trailpart=`
    <table style="position: absolute; top: 65px;width: 92%; margin: auto; left: 80px; right: 0;">
        <tbody>
          <tr>
            <td style="text-align: left; white-space: nowrap; width: 1%;">
              <p style="font-size: 11pt; margin-top: -5px;">Click on logo to verify on Blockchain&nbsp;</span>     
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="height: 25px; margin-top: -5px;" /></a>&nbsp;                                                 
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>
    `;
   }
   else if(templateid.indexOf("template142e")!=-1)
   {     
    let qr_code = await getQRwithbase64(verifyurl, 300);
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
            @font-face {
              font-family:"kartikab";
              src: url("${myip}/fonts/cutm/kartikab.ttf") format("truetype");
            }
            @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body> 
    `;

    trailpart=`
    <table style="position: absolute; top: 1080px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
    `;
    html = html.replace("PRINT_CODE", `${qr_code}`);
   }
   else if(templateid.indexOf("template143e_degree")!=-1)
   {     
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }            
            @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
          #template143e_degree_body{
            background-image: url('${myip}/images/IILM/template141background.png');
            background-repeat: no-repeat;
            background-size: cover;
            width: 297mm;
            height: 209mm;
            position: absolute;
            top: 0px;
          }  
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body id="template143e_degree_body"> 
    `;

    trailpart=`
    <table style="position: absolute; bottom: 8px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
    `;
   }
   else if(templateid.indexOf("template143e")!=-1)
   {     
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }            
            @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
            #template143e-body {           
              background-image: url("${myip}/images/IILM/template143background.png");
              background-repeat: no-repeat;
              background-size: cover;
              width: 210mm;
            }
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body id="template143e-body"> 
    `;

    trailpart=`
    <table style="position: absolute; top: 65px;width: 92%; margin: auto; left: 80px; right: 0;">
        <tbody>
          <tr>
            <td style="text-align: left; white-space: nowrap; width: 1%;">
              <p style="font-size: 11pt; margin-top: -5px;">Click on logo to verify on Blockchain&nbsp;</span>     
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="height: 25px; margin-top: -5px;" /></a>&nbsp;                                                 
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>
    `;
   }
   else if(templateid.indexOf("template144e")!=-1)
   {     
    let qr_code = await getQRwithbase64(verifyurl, 300);
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
            @font-face {
              font-family:"kartikab";
              src: url("${myip}/fonts/cutm/kartikab.ttf") format("truetype");
            }
            @font-face {
              font-family:"BaroqueScript";
              src: url("https://www.certonce.com/fonts/BaroqueScript.ttf") format("truetype");}
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body> 
    `;

    trailpart=`
    <table style="position: absolute; top: 1080px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
    `;
  html = html.replace("PRINT_CODE", `${qr_code}`);
   }
   else if(templateid.indexOf("template145e")!=-1)
   {     
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
            }
            @font-face {
              font-family:"arial";
              src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
            }
            @font-face {
              font-family:"cloisterblackbt";
              src: url("${myip}/fonts/d_y_patil/CloisterBlackBT.ttf") format("truetype");
            }
            @font-face {
              font-family:"oldenglish";
              src: url("${myip}/fonts/d_y_patil/OldeEnglish.ttf") format("truetype");
            }
            @font-face {
              font-family:"english157bt";
              src: url("${myip}/fonts/d_y_patil/ENGL157N.ttf") format("truetype");}
          #template145e_body{
            background-image: url('${myip}/images/D_Y_Patil/template145backgrounddigital.png');
            background-repeat: no-repeat;
            background-size: cover;
            width: 210mm;
            height: 295mm;
            position: absolute;
            top: 0px;
          }  
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body > 
    `;

    trailpart=`
    <table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/D_Y_Patil/Seal.png" style="width: 23px; margin-top: 5px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
    `;
   }
   else if(templateid.indexOf("template146e")!=-1)
   {     
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
            @font-face {
              font-family:"timesnewroman";
              src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
            }
            @font-face {
              font-family:"arial";
              src: url("https://www.certonce.com/fonts/nitkkr/ARIAL.TTF") format("truetype");
            }          
            @font-face {
              font-family:"certificate";
              src: url("https://www.certonce.com/fonts/ct/certificate.ttf") format("truetype");
            }          
            @font-face {
              font-family:"blkchry";
              src: url("https://www.certonce.com/fonts/ct/blkchry.ttf") format("truetype");
            }          
        </style>
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body > 
    `;

    trailpart=`
    <table style="position: absolute; bottom: 25px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/CTU/ctu_logo.png" style="width: 23px; margin-top: 5px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
    `;
    html = html.replace("PRINT_REPLACE", `${myip}/images/backend/empty.png`)
   }
   else if(templateid.indexOf("template147e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 5px;width: 95%;margin-top: 0px;margin-left: 35px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 15px; color: #000;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/JAIN/jain_logo.png" style="width: 25px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
  // html = html.replace(/FRONT_IMAGE/g, `${myip}/images/JAIN/${pdffilename.replace(".json", "")}_digital.png`);
   }
    else if(templateid.indexOf("template148e")!=-1 || templateid.indexOf("template183e")!=-1 || templateid.indexOf("template205e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
          }               
          @font-face {
            font-family:"timesnewroman";
            src: url("${myip}/fonts/iilm/times.ttf") format("truetype");
          }
          @font-face {
            font-family:"timesnewromanbold";
            src: url("${myip}/fonts/iilm/timesbd.ttf") format("truetype");
          }
          @font-face {
            font-family:"pristina";
            src: url("${myip}/fonts/iilm/PRISTINA.TTF") format("truetype");
          }
          #${templateid}-body {
            background-image: url("${myip}/images/IILM/template148backgroundprint.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 210mm;
            height: 295mm;
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <script src="https://ajax.googleapis.com/ajax/libs/jquery/3.4.1/jquery.min.js"></script>
        <script>
          $(document).ready(function(){
            document.getElementById("digitalsecondpageid").style.display="none";
          });
        </script>
        </head>
        <body id="${templateid}-body">`;
      trailpart=`<table style="position: absolute; top: 65px;width: 92%; margin: auto; left: 80px; right: 0;">
        <tbody>
          <tr>
            <td style="text-align: left; white-space: nowrap; width: 1%;">
              <p style="font-size: 11pt; margin-top: -5px;">Click on logo to verify on Blockchain&nbsp;</span>     
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="height: 25px; margin-top: -5px;" /></a>&nbsp;                                                 
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>`;
      html = html.replace("PRINT_CODE", `${myip}/images/backend/empty.png`);
      html = html.replace("PRINT_TITLE", "&nbsp;");
    }
   else if(templateid.indexOf("template149e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }               
        @font-face {
          font-family:"timesnewroman";
          src: url("${myip}/fonts/iilm/times.ttf") format("truetype");
        }
        @font-face {
          font-family:"timesnewromanbold";
          src: url("${myip}/fonts/iilm/timesbd.ttf") format("truetype");
        }
        @font-face {
          font-family:"pristina";
          src: url("${myip}/fonts/iilm/PRISTINA.TTF") format("truetype");
        }
        #template149e-body {           
          background-image: url("${myip}/images/IILM/template149backgrounddigital.png");
          background-repeat: no-repeat;
          background-size: cover;
          width: 210mm;
          height: 295mm;
        }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body id="template149e-body">   
   `;   
    trailpart=`
      <table style="position: absolute; bottom: 0px;width: 92%; margin: auto; left: 0; right: 0;">
        <tbody>
          <tr>
            <td style="text-align: left; white-space: nowrap; width: 1%;">
              <p style="font-size: 12pt; margin-top: -5px;">Click on logo to verify on Blockchain&nbsp;</span>     
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="height: 25px; margin-top: -5px;" /></a>&nbsp;                                                 
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>
      `;   
    // html = html.replace("PRINT_CODE", `<img src="${myip}/images/backend/empty.png" style="width: 70px; margin-right: 85px;" />`);
    html = html.replace("PRINT_CODE", `${myip}/images/backend/empty.png`);
    html = html.replace("PRINT_TITLE", "&nbsp;");
   }
    else if(templateid.indexOf("template150e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
          -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        }        
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; bottom: 1px;width: 95%;margin-top: 0px;margin-left: 35px;margin-bottom: 0px;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="${myip}/images/Bhopal/bhopal_logo.png" style="width: 25px;" /></a>&nbsp;&nbsp;                    
          </td>             
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
      html = html.replace(/PRINT_CODE/g, `${myip}/images/backend/empty.png`);
    }
    else if(templateid.indexOf("template151e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
          -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        }        
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; bottom: 5px;width: 95%;margin-top: 0px;margin-left: 35px;margin-bottom: 0px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 15px; color: #fff;">Click logo to verify on Blockchain&nbsp;</span>
            </td>                
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/Bhopal/bhopal_logo.png" style="width: 25px;" /></a>&nbsp;&nbsp;
            </td>             
          </tr>
        </tbody>
        </table>
        </body>
      </html>`;
      html = html.replace(/PRINT_CODE/g, `${myip}/images/backend/empty.png`);
    }
    else if(templateid.indexOf("template184e")!=-1) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
          <meta content="zh-tw" http-equiv="Content-Language" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title></title>
          <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
          <style type="text/css">
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
          </style>
          <style>
            body {
              background-image: url("${myip}/images/Bhopal/template184front.png");
              background-repeat: no-repeat;
              background-size: cover;
              width: 273mm;
              height: 220mm;
              position: absolute;
              margin: 0px;
            }
        </style>
        </head>
        <body>`;
      trailpart=`<table style="margin-left: 40px;">
        <tbody>
          <tr>
            <td style="text-align: left;"> 
              <span style="margin: 0px; font-size: 14pt;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="${myip}/images/Bhopal/bhopal_logo.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template152e")!=-1) {
      html=html.replace("margin-top: 130px;","margin-top: 100px;"); 
      html=html.replace("BACKGROUND_IMAGE",`${myip}/images/NDIM/${backgroundfilename}`);
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
          <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
          <meta content="zh-tw" http-equiv="Content-Language" />
          <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
          <title></title>
          <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
          <style type="text/css">
            @font-face {
              font-family:"bookmanoldstyle";
              src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
            }
            @font-face {
              font-family:"britanic";
              src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
            }
            @font-face {
              font-family:"calibri";
              src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
            }
          </style>
          <style>
            .main-back{
              background-image: url('https://www.certonce.com/images/NDIM/pgdmbacknew.png');
              background-repeat: no-repeat;
              background-size: cover;
              width:297mm;
              height:196.19647917mm;
            }
        </style>
        </head>
        <body>`;
      trailpart=`<table style="width: 100%;margin-top: 2px;margin-left: 0px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template153e")!=-1 || templateid.indexOf("template182e")!=-1 || templateid.indexOf("template209e")!=-1)
    {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
          -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        } 
        @font-face {
          font-family:"bookmanoldstyle";
          src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
        }
        @font-face {
          font-family:"britanic";
          src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
        }
        @font-face {
          font-family:"calibri";
          src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
        }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart1=`<table style="width: 100%;margin-top: -50px;margin-left: 0px; margin-bottom: -10px;">
          <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 20px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 39px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
              </td>
            </tr>
          </tbody>
        </table>   
        </body>
        </html>`;
      trailpart=`<table style="width: 96%; position: absolute; top: 2180px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 45px;" /></a>&nbsp;&nbsp;
            </td>
            <td style="text-align: right;">
                <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 30px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                &nbsp;
                <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;" /></a>
            </td>
          </tr>
        </tbody>
      </table>   
      </body>
      </html>`;
      // html = html.replace("NDIM_SECOND_BACK", "https://www.certonce.com/images/NDIM/ndimdigitalsecond.png");
      html=html.replace("NDIM_FIRST_BACK",`${myip}/images/NDIM/${trbackgroundfilename.split(",")[0]}`); 
      html=html.replace("NDIM_SECOND_BACK",`${myip}/images/NDIM/${trbackgroundfilename.split(",")[1]}`); 
    }
   else if(templateid.indexOf("template154e")!=-1)
   {     
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
          }
          @font-face {
            font-family:"timesnewroman_1";
            src: url("https://www.certonce.com/fonts/iilm/timesnewroman_1.ttf") format("truetype");
          }
          @font-face {
            font-family:"timesnewroman_2";
            src: url("https://www.certonce.com/fonts/iilm/timesnewroman_2.ttf") format("truetype");
          }
          @font-face {
            font-family:"timesnewroman_3";
            src: url("https://www.certonce.com/fonts/iilm/timesnewroman_3.ttf") format("truetype");
          }
          @font-face {
            font-family:"english111";
            src: url("${myip}/fonts/iilm/E111Viva.ttf") format("truetype");
          }
          body {
            width: 310mm;
            height: 219mm;
            margin: 0px;
          }
        </style>
      </head>
      <body>`;
    trailpart=`
      <table style="position: absolute; top: 211mm; right: 0mm; left:50px;">
        <tbody>
          <tr>
            <td style="text-align: left; white-space: nowrap; width: 1%;">
              <p style="font-size: 11pt; margin: 0px; margin-top: -2px; height: 11pt;">Click on logo to verify on Blockchain&nbsp;</span>
            </td>                
            <td style="text-align: left; align-content: flex-start;">
               <a href="${verifyurl}"><img src="${myip}/images/IILM/lucknow_main_logo.png" style="height: 0.2in; width:0.2in;" /></a>
            </td>
          </tr>
        </tbody>
        </table>
      </body>
      </html>`;
   }
  else if(templateid.indexOf("template155e")!=-1 ) {
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
      }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>`;
    trailpart=`<table style="position: absolute; left: 3mm; top: 345mm">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
          </td>             
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
  }
   else if(templateid.indexOf("template156e")!=-1 ) {
    let certificationcategory =  student['certificationcategory'];
    let digitallyverifiedplacementH = "1072px";
    let coeH = "1058px";
    let principalH = "1063px";
    
    if(certificationcategory=="master")
    {
      digitallyverifiedplacementH = "1041px";
      coeH = "1030px";
      principalH = "1030px";
    }
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
      <span style="position:absolute;top:${digitallyverifiedplacementH};left:48px;font-size: 9px;font-style:italic;z-index:40;">Digitally verified</span>                    
      <img src="${myip}/images/RV/coe.png" style="position:absolute;top:${coeH};left:380px; width: 55px;z-index:40;" />
      <img src="${myip}/images/RV/principal.png" style="position:absolute;top:${principalH};left:657px; width: 81px;z-index:40;" />
   `;   

   trailpart=`
   
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template188e")!=-1 ) {
    let certificationcategory =  student['certificationcategory'];
    let digitallyverifiedplacementH = "1072px";
    let coeH = "1061px";
    let principalH = "1063px";
    
    if(certificationcategory=="master")
    {
      digitallyverifiedplacementH = "1041px";
      coeH = "1030px";
      principalH = "1030px";
    }
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
      <span style="position:absolute;top:${digitallyverifiedplacementH};left:48px;font-size: 9px;font-style:italic;z-index:40;">Digitally verified</span>                    
      <img src="${myip}/images/RV/coe_new.png" style="position:absolute;top:${coeH};left:355px; width: 95px;z-index:40;" />
      <img src="${myip}/images/RV/principal.png" style="position:absolute;top:${principalH};left:657px; width: 81px;z-index:40;" />
   `;   

   trailpart=`
   
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template202e")!=-1 ) {
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
        -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
      }
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>`;
    trailpart=`<table style="position: absolute; left: 3mm; top: 345mm">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;"> 
            <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
          </td>                
          <td style="text-align: left;">     
            <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
          </td>             
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
  }
   else if(templateid.indexOf("template203e")!=-1 ) {
    let certificationcategory =  student['certificationcategory'];
    let digitallyverifiedplacementH = "1072px";
    let coeH = "1058px";
    let principalH = "1063px";
    
    if(certificationcategory=="master")
    {
      digitallyverifiedplacementH = "1041px";
      coeH = "1030px";
      principalH = "1030px";
    }
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
      <span style="position:absolute;top:${digitallyverifiedplacementH};left:48px;font-size: 9px;font-style:italic;z-index:40;">Digitally verified</span>                    
      <img src="${myip}/images/RV/coe.png" style="position:absolute;top:${coeH};left:380px; width: 55px;z-index:40;" />
      <img src="${myip}/images/RV/Principal_green.png" style="position:absolute;top:${principalH};left:657px; width: 81px;z-index:40;" />
   `;   

   trailpart=`
   
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template204e")!=-1 ) {
    let certificationcategory =  student['certificationcategory'];
    let digitallyverifiedplacementH = "1072px";
    let coeH = "1061px";
    let principalH = "1063px";
    
    if(certificationcategory=="master")
    {
      digitallyverifiedplacementH = "1041px";
      coeH = "1030px";
      principalH = "1030px";
    }
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
      <span style="position:absolute;top:${digitallyverifiedplacementH};left:48px;font-size: 9px;font-style:italic;z-index:40;">Digitally verified</span>                    
      <img src="${myip}/images/RV/coe_new.png" style="position:absolute;top:${coeH};left:355px; width: 95px;z-index:40;" />
      <img src="${myip}/images/RV/Principal_green.png" style="position:absolute;top:${principalH};left:657px; width: 81px;z-index:40;" />
   `;   

   trailpart=`
   
   <table style="position: absolute; bottom: 2px;width: 95%;margin-top: 0px;margin-left: 15px;margin-bottom: 0px;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>
  `;
   }
   else if(templateid.indexOf("template196e")!=-1) {
    headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <style type="text/css">
          @font-face {
            font-family:"playfair";
            src: url("https://test.certonce.com/fonts/rv/Playfair_Display_Regular.ttf") format("truetype");
          }
          @font-face {
            font-family:"roboto";
            src: url("https://test.certonce.com/fonts/rv/Roboto_Regular.ttf") format("truetype");
          }
        </style>
        <style>
          body {
            background-image: url("${myip}/images/RV/template196background.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 297mm;
            height: 210mm;
            position: absolute;
            margin: 0px;
          }
        </style>
      </head>
      <body>`;
    trailpart=`
      <table style="position: absolute; top: 185mm; left: 40mm;">
        <tbody>
          <tr style="text-align: center;">
            <td>
            <a href="${verifyurl}"><img src="${myip}/images/RV/rv_logo_cesd.png" style="height: 20mm;" /></a></td>               
          </tr>                
          <tr style="text-align: center;">
            <td>     
            <span style="margin: 0px; font-size: 13pt;">Click logo to verify</span></td>          
          </tr>
        </tbody>
      </table>
      </body>
      </html>`;
   }
   else if(templateid.indexOf("template157e")!=-1)
   {
    headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
        <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        
        <style>      
        *{
              margin: 0px;
              padding: 0px;
        }      
      </style>
      </head>
      <body> 
    `;
    trailpart=`
    <table style="position: absolute; top: 755px;width: 90%;margin-top: 0px;margin-left: 30px;margin-bottom: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/CUTM/cutm_logo.png" style="width: 25px; margin-bottom: 0px;" /></a>&nbsp;&nbsp;                    
              </td>              
            </tr>
      </tbody>
      </table>
      </body>
      </html>
   `;
    
   }
   else if(templateid.indexOf("template158e")!=-1 ) {
    headerpart=`
    <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
      <html xmlns="http://www.w3.org/1999/xhtml">
      <head>
      <meta content="zh-tw" http-equiv="Content-Language" />
      <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
      <title></title>
      <style>
      html {
      -webkit-print-color-adjust: exact;
      }
      @media print {
        body {-webkit-print-color-adjust: exact;}
        }         
        
        @font-face {
          font-family:"krutidev010regular";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010Regular.ttf") format("truetype");
        }
        @font-face {
          font-family:"krutidev010condensed";
          src: url("https://www.certonce.com/fonts/galgotias/KrutiDev010CondensedRegular.ttf") format("truetype");
        }        
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
        }   
       
      </style>
      <link rel="preconnect" href="https://fonts.googleapis.com">
      <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
      <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
      <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
      </head>
      <body>   
   `;   

   trailpart=`
   <table style="position: absolute; bottom: 0px;width: 95%;">
     <tbody>
           <tr>
             <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                 <span style="margin: 0px 10px;font-size: 12px; color: #ffffff;">Click logo to verify on Blockchain&nbsp;</span>                    
             </td>                
             <td style="text-align: left;">     
                 <a href="${verifyurl}"><img src="https://www.certonce.com/images/Galgotias/Colored Logo D.png" style="width: 18px; margin-bottom: -2px; border: 3px solid #ffffff; border-radius: 50px;" /></a>&nbsp;&nbsp;                    
             </td>             
           </tr>
     </tbody>
     </table>
     </body>
     </html>`;
    }
    else if(templateid.indexOf("template160e")!=-1 ) {
      let qr_code = await getQRwithbase64(verifyurl, 300);
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
        }
        @font-face {
          font-family:"timesnewroman";
          src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");}                 
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; bottom: 0px;width: 95%;margin-top: 0px;margin-bottom: 0px;margin-left:6px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 15px;color: #fff;position:relative;top:2px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="${myip}/images/snu/snulogo_1.png" style="width: 20px;position:relative;top:4px;" /></a>&nbsp;&nbsp;                    
            </td>             
          </tr>
        </tbody>
        </table>
        </body>
        </html>`;
      html = html.replace(/PRINT_CODE/g, `${myip}/images/backend/empty.png`);
    }
    else if(templateid.indexOf("template161e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        } 
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; top: 1080px;width: 95%;margin-top: 0px;margin-left: 25px;margin-bottom: 0px;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
            </td>                
            <td style="text-align: left;">     
                <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;                    
            </td>              
          </tr>
        </tbody>
        </table>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template162e")!=-1 || templateid.indexOf("template173e")!=-1 || templateid.indexOf("template174e")!=-1 || templateid.indexOf("template175e")!=-1 || templateid.indexOf("template176e")!=-1 || templateid.indexOf("template177e")!=-1 || templateid.indexOf("template178e")!=-1 || templateid.indexOf("template179e")!=-1) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
          }         
          @font-face {
            font-family:"english111vivace";
            src: url("https://www.certonce.com/fonts/sbup/E111Viva.ttf") format("truetype");
          }
          @font-face {
            font-family:"helvetica";
            src: url("https://www.certonce.com/fonts/sbup/Helvetica-Bold-Font.ttf") format("truetype");
          }
          @font-face {
            font-family:"oldnglishletplain";
            src: url("https://www.certonce.com/fonts/sbup/OLDENGL.TTF") format("truetype");
          }
          @font-face {
            font-family:"cataneo";
            src: url("https://www.certonce.com/fonts/sbup/TT0952M.TTF") format("truetype");
          }
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; top: 1049px;left:59px;width:100mm;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;">
              <span style="margin: 0px 10px;font-size: 11px;font-family:timesnewroman;">Click logo to verify on Blockchain&nbsp;</span>
            </td>
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/sbup/logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;
            </td>              
          </tr>
        </tbody>
        </table>
      </body>
      </html>`;
    }
    else if(templateid.indexOf("template201e")!=-1 || templateid.indexOf("template193e")!=-1) {
      let qr_code = await getQRwithbase64(verifyurl, 300);
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
          }         
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; top: 288mm;left:12mm;width:100mm;">
      <tbody>
        <tr>
          <td style="text-align: left;width: 1%;white-space: nowrap;">
            <span style="margin: 0px 10px;font-size: 11px;font-family:timesnewroman;">Click logo to verify on Blockchain&nbsp;</span>
          </td>
          <td style="text-align: left;">
            <a href="${verifyurl}"><img src="${myip}/images/kubu/logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;
          </td>              
        </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    }
    else if(templateid.indexOf("template164e")!=-1 || templateid.indexOf("template186e")!=-1) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
          }
          @font-face {
            font-family:"georgia";
            src: url("https://www.certonce.com/fonts/apex/georgia.ttf") format("truetype");
          }
          @font-face {
            font-family:"georgiab";
            src: url("https://www.certonce.com/fonts/apex/georgiab.ttf") format("truetype");
          }        
          @font-face {
            font-family:"georgiai";
            src: url("https://www.certonce.com/fonts/apex/georgiai.ttf") format("truetype");
          }
          @font-face {
            font-family:"georgiaz";
            src: url("https://www.certonce.com/fonts/apex/georgiaz.ttf") format("truetype");
          }
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/apex/timesnewroman.ttf") format("truetype");
          }   
          @font-face {
            font-family:"OLDENGL";
            src: url("https://www.certonce.com/fonts/apex/OLDENGL.TTF") format("truetype");
          }   
          @font-face {
            font-family:"amazonebt";
            src: url("https://www.certonce.com/fonts/apex/amazonebt_regular.ttf") format("truetype");
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; left:51px;top:984px;width: 95%;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;"> 
              <span style="margin: 0px 10px;font-size: 13px; color: #000;font-family:timesnewroman;">Click logo to verify on Blockchain&nbsp;</span>
            </td>
            <td style="text-align: left;">     
              <a href="${verifyurl}"><img src="https://www.certonce.com/images/apex/logo.png" style="width: 50px; margin-bottom: -8px; " /></a>&nbsp;&nbsp;
            </td>
            <td style="text-align: left;width: 85mm;white-space: nowrap;">
              <span style="margin: 0px 10px;font-size: 18px; color: #000;font-family:timesnewroman;font-weight:bold">THIS IS A DIGITAL COPY</span>
            </td>
          </tr>
        </tbody>
        </table>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template165e")!=-1 ) {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
          }
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
          }   
        
        </style>
        </head>
        <body>   
    `;   

    trailpart=`
    <table style="position: absolute; top: 110px;left:53px;margin-top: 0px;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="font-size: 10px;color: #000;position:relative;top:2px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/snu/snulogo_1.png" style="width: 20px;position:relative;top:4px;" /></a>&nbsp;&nbsp;                    
              </td>             
            </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    }
    else if(templateid.indexOf("template166e")!=-1 ) {
      headerpart=`
      <!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        } 
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;   

    trailpart=`<table style="position: absolute; top:276mm;left:10mm;width:100mm;">
      <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 15px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="${myip}/images/rvim/rvim_logo.png" style="width: 25px; margin-bottom: -2px;" /></a>&nbsp;&nbsp;                    
              </td>             
            </tr>
      </tbody>
      </table>
      </body>
      </html>`;
    }
    else if(templateid.indexOf("template167e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
          -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        }

        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body> 
        <img style="height: 32px;position: absolute;left:140mm;top:262mm;z-index:10;" src="${myip}/images/nicmar/provisionalcoesignature.png">`;
      trailpart=`<div style="margin: 0px 10px; font-size: 16px; position: absolute; top: 262mm; left: 7mm; width: 100mm;">Click on logo to verify</div>
        <div style="position: absolute; top: 270mm; left: 18mm; width: 105mm;"><a href="${verifyurl}"><img src="${myip}/images/nicmar/nicmarlogo.png" style="width: 72px; margin-bottom: -2px;" /></a></div>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template168e")!=-1 ) 
    {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
          }  
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<div style="margin: 0px 10px; font-size: 16px; position: absolute; top: 262mm; left: 7mm; width: 100mm;">Click on logo to verify</div>
        <div style="position: absolute; top: 270mm; left: 18mm; width: 105mm;"><a href="${verifyurl}"><img src="${myip}/images/nicmar/nicmarlogo.png" style="width: 72px; margin-bottom: -2px;" /></a></div>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template169e")!=-1 || templateid.indexOf("template208e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
        -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
          }               
          @font-face {
            font-family:"timesnewroman";
            src: url("${myip}/fonts/iilm/times.ttf") format("truetype");
          }
          @font-face {
            font-family:"timesnewromanbold";
            src: url("${myip}/fonts/iilm/timesbd.ttf") format("truetype");
          }
          @font-face {
            font-family:"pristina";
            src: url("${myip}/fonts/iilm/PRISTINA.TTF") format("truetype");
          }
          #template169e-body {           
            background-image: url("${myip}/images/IILM/template148backgrounddigital.png");
            background-repeat: no-repeat;
            background-size: cover;
            width: 210mm;
            height: 295mm;
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body id="template169e-body">   
    `;   
      trailpart=`
        <table style="position: absolute; top: 65px;width: 92%; margin: auto; left: 80px; right: 0;">
          <tbody>
            <tr>
              <td style="text-align: left; white-space: nowrap; width: 1%;">
                <p style="font-size: 11pt; margin-top: -5px;">Click on logo to verify on Blockchain&nbsp;</span>     
              </td>                
              <td style="text-align: left;">
                <a href="${verifyurl}"><img src="${myip}/images/IILM/iilm_gurugram_logo.png" style="height: 25px; margin-top: -5px;" /></a>&nbsp;                                                 
              </td>
            </tr>
          </tbody>
        </table>
        </body>
        </html>`;
      html = html.replace("PRINT_CODE", `${myip}/images/backend/empty.png`);
      html = html.replace("PRINT_TITLE", "&nbsp;");
    }
    else if(templateid.indexOf("template170e")!=-1 ) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
        html {
          -webkit-print-color-adjust: exact;
        }
        @media print {
          body {-webkit-print-color-adjust: exact;}
        }
        @font-face {
          font-family: 'Monotype Corsiva';
          src: url('https://www.certonce.com/fonts/nicmar/unicode.corsiva.ttf') format('truetype');
        }
        @font-face {
          font-family:"Times New Roman Italic";
          src: url("https://www.certonce.com/fonts/nicmar/FontsFree-Net-times-new-roman-italic.ttf") format("truetype");
        }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<div style="font-size: 14px; position: absolute; top: 263mm; left: 4mm; width: 100mm;">Click on logo to verify</div>
        <div style="position: absolute; top: 271.5mm; left: 7.5mm;"><a href="${verifyurl}"><img src="${myip}/images/nicmar/nicmarlogo.png" style="width: 72px;" /></a></div>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template171e")!=-1)
    {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
          <head>
            <meta name="viewport" content="width=device-width, minimum-scale=1, initial-scale=1, user-scalable=yes">
            <meta content="zh-tw" http-equiv="Content-Language" />
            <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
            <title></title>
            <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
            <style type="text/css">
                @font-face {
                  font-family:"bookmanoldstyle";
                  src: url("https://www.certonce.com/fonts/ndim/bookmanoldstyle.ttf") format("truetype");
                }
                @font-face {
                  font-family:"britanic";
                  src: url("https://www.certonce.com/fonts/ndim/britanic.ttf") format("truetype");
                }
                @font-face {
                  font-family:"calibri";
                  src: url("https://www.certonce.com/fonts/ndim/calibri.ttf") format("truetype");
                }
            </style>
            <style>
            body {
              margin: 0px;
            }
            .main-back{
              background-image: url('https://www.certonce.com/images/NDIM/ndim_diploma_2021_23.png');
              background-repeat: no-repeat;
              background-size: 100% 100%;
              width:298mm;
              height:211mm;
            }
          </style>
          </head>
        <body>`;
        trailpart=`<table style="width: 100%;margin-top: 2px;margin-left: 0px;">
          <tbody>
            <tr>
              <td style="text-align: left;width: 1%;white-space: nowrap;"> 
                  <span style="margin: 0px 10px;font-size: 18px;">Click logo to verify on Blockchain&nbsp;</span>                    
              </td>                
              <td style="text-align: left;">     
                  <a href="${verifyurl}"><img src="https://www.certonce.com/images/certonce.png" style="width: 30px;" /></a>&nbsp;&nbsp;                    
              </td>
              <td style="text-align: right;">
                  <a  target="_blank" href="https://www.linkedin.com/profile/add?startTask=CERTIFICATION_NAME&name=${competencyname}&organizationName=${organization_name}&certUrl=${verifyurl}"><img src="https://www.certonce.com/images/linkprofile.png" style="height: 32px;position: relative;top:4px;" /></a> &nbsp;&nbsp;&nbsp;
                  <img src="https://www.certonce.com/images/share.png" style="height: 25px;" /> &nbsp;
                  <a href="https://www.facebook.com/sharer/sharer.php?u=${verifyurl}"><img src="https://www.certonce.com/images/facebook.png" style="height: 25px;" /></a> &nbsp;
                  <a href="https://www.linkedin.com/shareArticle?url=${verifyurl}"><img src="https://www.certonce.com/images/linkedin.png" style="height: 25px;" /></a> &nbsp;                    
                  <a href="https://twitter.com/intent/tweet?url=${verifyurl}"><img src="https://www.certonce.com/images/twitter.png" style="height: 25px;" /></a> 
                  &nbsp;
                  <a href="https://wa.me/?text=${verifyurl}"><img src="https://www.certonce.com/images/whatsapp.png" style="height: 25px;padding-right: 10px;" /></a>
              </td>
            </tr>
          </tbody>
          </table>
        </body>
        </html>`;
    }
    else if(templateid.indexOf("template180e") != -1) {
      headerpart=`<!DOCTYPE html PUBLIC "-//W3C//DTD XHTML 1.0 Transitional//EN" "http://www.w3.org/TR/xhtml1/DTD/xhtml1-transitional.dtd">
        <html xmlns="http://www.w3.org/1999/xhtml">
        <head>
        <meta content="zh-tw" http-equiv="Content-Language" />
        <meta content="text/html; charset=utf-8" http-equiv="Content-Type" />
        <title></title>
        <style>
          html {
            -webkit-print-color-adjust: exact;
          }
          @media print {
            body {-webkit-print-color-adjust: exact;}
          }
          @font-face {
            font-family:"timesnewroman";
            src: url("https://www.certonce.com/fonts/mit/timesnewroman.ttf") format("truetype");
          }
        </style>
        <link rel="preconnect" href="https://fonts.googleapis.com">
        <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
        <link href="https://fonts.googleapis.com/css2?family=Montserrat:wght@100;200;300;400;500;600;700;800;900&display=swap" rel="stylesheet">
        <script type="text/javascript" src="https://www.certonce.com/js/JsBarcode.code128.min.js"></script>
        </head>
        <body>`;
      trailpart=`<table style="position: absolute; top: 1049px;left:59px;width:100mm;">
        <tbody>
          <tr>
            <td style="text-align: left;width: 1%;white-space: nowrap;">
              <span style="margin: 0px 10px;font-size: 11px;font-family:timesnewroman;">Click logo to verify on Blockchain&nbsp;</span>
            </td>
            <td style="text-align: left;">
              <a href="${verifyurl}"><img src="${myip}/images/sbup/logo.png" style="width: 23px;" /></a>&nbsp;&nbsp;
            </td>              
          </tr>
        </tbody>
        </table>
      </body>
      </html>`;
    }
    var body_html=html.replace(/"/g,'"');
    body_html=body_html.replace(/NDIM_BR_SCAN/g,'');
    if(templateid.indexOf("template71e")!=-1){
      let qr_logo_image = await QR_With_Logo_Main(verifyurl);
      body_html = body_html.replace(/QR_WITH_LOGO/g, qr_logo_image);
    }
    if (templateid.indexOf("template95e") != -1 || templateid.indexOf("template98e") != -1 || templateid.indexOf("template106e") != -1 || templateid.indexOf("template107e") != -1 || templateid.indexOf("template120e") != -1|| templateid.indexOf("template194e") != -1){
      body_html = body_html.replace("PRINT_REPLACE", "");
      body_html = body_html.replace(/PRINT_BR_REPLACE/g, "");
    }
    if (templateid.indexOf("template115e") != -1 || templateid.indexOf("template118e") != -1){
      body_html = body_html.replace("QR_GENERATE_CODE", "");
    }
    if(isgenerate==false)
    {
      if(templateid.indexOf("template26e")!==-1) return headerpart+body_html+trailpart;
      if(templateid.indexOf("template71e") !==-1){     
      verifypart =`<table style="width: 100%;margin-top: 10px;">
      <tbody>
        <tr>
          <td style="text-align: left; width: 1%; white-space: nowrap;">
            <span style="margin: 0px 10px; font-size: 14px;">Click logo to verify on Blockchain&nbsp;</span>
          </td>
          <td style="text-align: left;">
            <a href="${verifyurl}">
              <img src="https://www.certonce.com/images/certonce.png" style="width: 35px;">
            </a>
          </td>
        </tr>
      </tbody>
      </table>`;
      body_html = body_html.replace(/VERIFY_REPLACE/g, verifypart);
      }
      if (templateid.indexOf("template72e") !== -1){
        let verifypart = `<table style="width: 85%; margin-top: -5px;">
        <tbody>              
          <tr>
              <td style="text-Align: left; width: 55%;">
              </td>
              <td style="width: 1%; text-Align: right; p: -10px; white-space: nowrap;">
                  <p style="text-align: right; margin-top: 0px; font-size: 14px; color: #000000; font-family: 'Sapient Sans';">Click logo or scan QR to verify on Blockchain</p>  
              </td>
              <td>
                <a href="${verifyurl}"><img src="https://www.certonce.com/images/bennett/bennett_logo.png" style="height: 30px; margin-top: -5px;" /></a>&nbsp;&nbsp;  
              </td> 
          </tr>
          </tbody>
        </table>`;
      body_html = body_html.replace(/VERIFY_REPLACE/g, verifypart);
      }
      if (templateid.indexOf("template86e") !== -1 || templateid.indexOf("template88e") !== -1){
        let temp = `<table style="width: 95%; margin-bottom: -40px;">
        <tbody>
          <tr>                
              <td style="text-align: left; width: 1%; white-space: nowrap;">
                  <p style="text-align: left; font-size: 14px; color: #000000; font-family: timesnewroman; letter-spacing: 0.7px;">Click logo to verify on blockchain</p>  
              </td> 
              <td style="text-align: left;">  
                  <a href="${verifyurl}">
                      <img style="height: 40px;" src="https://www.certonce.com/images/NITKKR_logo.png" />  
                  </a>                       
              </td>
          </tr> 
        </tbody>
      </table>`;
      body_html = body_html.replace("VERIFY_REPLACE_PART", temp);
      }
      return headerpart+body_html+trailpart;
    }
    else {
      if(templateid.indexOf("template26e")!==-1) return headerpart1+body_html+trailpart;   
      if(templateid.indexOf("template71e") !==-1 || templateid.indexOf("template72e") !==-1){
        body_html = body_html.replace(/VERIFY_REPLACE/g, "");
      }  
      if (templateid.indexOf("template86e") !== -1 || templateid.indexOf("template88e") !== -1){
        body_html = body_html.replace(/VERIFY_REPLACE_PART/g, "");
      }
      return headerpart+body_html+`</body></html>`;
    }
  }
  catch(err) {
    console.log(err);
  }
}

async function getQRwithbase64(code, width, write=false) {  
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(
    canvas,
    code,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#000000",
        light: "#ffffff",
      },
    }
  );
  // console.log(canvas.toDataURL("image/png"));
  let result = canvas.toDataURL("image/png");
  
  return result;
}

async function QR_With_Logo_Generate(dataForQRcode, center_image, width, cwidth) {
  const canvas = createCanvas(width, width);
  QRCode.toCanvas(
    canvas,
    dataForQRcode,
    {
      errorCorrectionLevel: "H",
      margin: 1,
      color: {
        dark: "#0060aa",
        light: "#ffffff",
      },
    }
  );

  const ctx = canvas.getContext("2d");
  const img = await loadImage(center_image);
  const center = (width - cwidth) / 2;
  ctx.drawImage(img, center, center, cwidth, cwidth);
  return canvas.toDataURL("image/png");
}

async function QR_With_Logo_Main(verifier_url) {
  const qrCode = await QR_With_Logo_Generate(
    verifier_url,
    `${myip}/images/backend/charusat_logo.png`,
    204,
    82
  );
  //console.log(qrCode);
    return qrCode;
  
}

async function readPhotoFile(s3obj,collegeid,cohortid,studentid,bucket_name="certonce")
{
  if(bucket_name=="") return "";
  var getParams  = {Bucket: bucket_name, Key: ''};
  try
  {     
    getParams.Key = "education_photo/"+collegeid+"/"+cohortid+"/"+studentid;
    //console.log(getParams.Key);
    var data=await s3obj.getObject(getParams).promise();    
    
    return data.Body.toString(); 
  }
  catch(err)
  {
    console.log(err);
    return ""; 
  }
}

module.exports = {
  generatePDF : async function (fs, path, pdfParse, puppeteer,homedir,verifier_url_direct,s3obj,bucket_region,templateid,html,pdffilename,collegeid,organization_verify_uri,iss3,p_BucketKey, bucket_name, backgroundfilename="",trbackgroundfilename="", isgenerate=false, student=null)
  {
    try
    {
      
      let verifyurl=verifier_url_direct;

      /*
      verifyurl=verifier_url_direct+organization_verify_uri+"/"+collegeid+"/"+pdffilename.replace(".json","");
      if(collegeid=="20025")
      {
        verifyurl="https://growthschool.certonce.com/blockchainverifier/"+collegeid+"/"+pdffilename.replace(".json","");
      }
      else if(collegeid=="20021")
      {
        verifyurl="https://verification.spjimr.org/verify/"+p_BucketKey.replace("pdf/","")+"/"+pdffilename.replace(".json","");
      }
      else if(collegeid=="20045")
      {
        verifyurl="https://verification.ndimexamination.org/verify/"+p_BucketKey.replace("pdf/","")+"/"+pdffilename.replace(".json","");
      }
      else if(collegeid=="20027")
      {
        verifyurl="https://360digitmg.com/verifier/"+pdffilename.replace(".json","");
      }
      else if(collegeid=="20001")
      {
        let subdir="";
        if(p_BucketKey.toLowerCase().indexOf("o21")!==-1)
          subdir="O21/";
        else if(p_BucketKey.toLowerCase().indexOf("j22")!==-1)
          subdir="J22/";
        else if(p_BucketKey.toLowerCase().indexOf("a21")!==-1)
          subdir="A21/";
        else if(p_BucketKey.toLowerCase().indexOf("m22")!==-1)
          subdir="M22/";
        verifyurl="https://certification.mitwpu.edu.in/verify/"+subdir+pdffilename.replace(".json","");
        
      }
      */
      const cert_urlqr = encodeURIComponent(verifyurl)
      const qrcode = "<img src='https://chart.googleapis.com/chart?chs=300x300&cht=qr&chl="+cert_urlqr+"' title='verify url' />"
      pdffilename=pdffilename.replace(".json",".pdf");
      pdffilepath=homedir+"/certpdf/";
      //await fsExtra.emptyDirSync(pdffilepath);
      pdffilepath=homedir+"/certpdf/"+pdffilename;
      let data = {};
      
      let result_html=await getHtmlTemplate(templateid,html,verifyurl,isgenerate,pdffilename.replace(".json","").replace(".pdf",""), backgroundfilename, trbackgroundfilename, student);
      
      await fs.writeFileSync("/home/ubuntu/generatetemplateresult.html",result_html);
      const browser = await puppeteer.launch({
      headless:true,
      args: ["--no-sandbox","--start-maximized","--disable-dev-shm-usage"]
      });
      const page = await browser.newPage();
      await page.setViewport({width:0, height:0});
      await page.setContent(result_html,{ waitUntil: 'networkidle0', timeout: 600000 });    
      await page.evaluateHandle('document.fonts.ready');
      await page.addStyleTag({
      content: '@page { size: auto; }',
      });

      
      console.log("genertepdf templateid=", templateid)
      switch(templateid)
      {
        case "template25e":
        case "template1e":
        case "template16e":
        case "template14e":
        case "template12e":
        case "template154e":          
        case "template131e_landscape":
        case "template139e":
        case "template143e_degree":
        case "template146e":
        case "template157e":
        case "template135e":        
          {
            await page.pdf({ path: pdffilepath, format: 'A4',printBackground: true,landscape: true,margin: "none" });
            break;
          }
        case "template160e":
          {
            
            // Wait for the elements to be available in the DOM
            await page.waitForSelector('.dynamic-text');

        
            let dimension = await page.evaluate(() => {
              function adjustFontSize() {
                var element = document.querySelector('.dynamic-text');
                let fontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue("font-size"));                
                while (element.scrollWidth > 1050) {
                   fontSize -= 0.1; // Decrease font size by 1px
                   element.style.fontSize = fontSize + 'px';
                   //return element.style.fontSize + "=" + element.scrollWidth;
                }
                // var bodywidth=document.querySelector("html").scrollWidth;
                // var diff = (parseInt(bodywidth)-parseInt(element.scrollWidth));
                // element.style.left=(parseInt(diff)-20)/2+"px";
                return element.style.fontSize + "=" +element.scrollWidth+"="+element.style.left;
               }
               var width=adjustFontSize();
               return width;
            });
           
            console.log(dimension);
            await page.pdf({ path: pdffilepath, format: 'A4',printBackground: true,landscape: true,margin: "none" });
            break;
          }
          case "template163e":
            {
              
              // Wait for the elements to be available in the DOM
              await page.waitForSelector('.dynamic-text1');
  
          
              let dimension = await page.evaluate(() => {
                function adjustFontSize() {
                  var element = document.querySelector('.dynamic-text1');
                  let fontSize = parseFloat(window.getComputedStyle(element, null).getPropertyValue("font-size"));                
                  while (element.scrollWidth > 800) {
                     fontSize -= 0.1; // Decrease font size by 1px
                     element.style.fontSize = fontSize + 'px';                   
                  }                 
                  return element.style.fontSize + "=" +element.scrollWidth+"="+element.style.left;
                 }
                 var width=adjustFontSize();
                 return width;
              });
             
              console.log(dimension);
              await page.pdf({ path: pdffilepath, format: 'A4',printBackground: true,portrait: true,margin: "none" });
              break;
            }
        case "template22e":
        case "template23e":
        case "template24e":
        case "template24e":
        case "template10e":
        case "template41e":
        case "template57e":
        case "template101e":
        case "template103e":
        case "template133e":
        case "template108e":
        case "template109e":
        case "template111e":
        case "template130e":
        case "template130goldmerit":
          {
            let height=297;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template60e":
        case "template61e":
        case "template62e":
        case "template69e":
        case "template87e":
        case "template90e":
        case "template93e":
        case "template94e":
        case "template95e":
        case "template98e":
        case "template100e":
        case "template105e":
        case "template106e":
        case "template194e":
        case "template119e":
        case "template120e":
        case "template122e":
        case "template127e":
        case "template129e":
        case "template196e":
          {
            let height=210;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"297mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"297mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template13e":
        case "template70e":
        case "template11e":
          {
            await page.pdf({ path: pdffilepath, format: 'A5',printBackground: true,landscape: true,margin: "none" });
            break;
          }
        case "template2e":
          {
            //await page.pdf({ path: pdffilepath, format: 'A4',printBackground: true,portrait: true,margin: "none" });
            let height=220;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            // while(numpages>1)
            // {
            //   height=height+1;
            //   await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
            //   dataBuffer = fs.readFileSync(pdffilepath);
            //   pdfParseResult=await pdfParse(dataBuffer);
            //   numpages=pdfParseResult.numpages;
            // }
            if(numpages > 1){
              height = 297;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);

            }
            break;
          }
        case "template3e":
        case "template78e":
        case "template171e":
          {
            let height=196.19647917;
            let numpages=1;
            await page.pdf({ path: pdffilepath, width:"297mm",printBackground: true, height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            console.log("height",height);
            while(numpages>1)
            {
              height=height+13.80352083;
              await page.pdf({ path: pdffilepath, width:"297mm",printBackground: true, height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
              console.log("height",height);
            }
            break;
          }
        case "template35e":
        case "template36e":
          {
            let height=216;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template56e":
          {
            let height=180;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template30e":
        case "template31e":
          {
            let height=210;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;           
            }
            break;
          }
        case "template45e":
          {
            let height=200;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"261mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"261mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template51e":
        case "template52e":
          {
            let height=152;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              console.log("height",height);
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template55e":
          {
            let height=148;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template65e":
        case "template79e":
        case "template80e":
        case "template81e":
        case "template66e":
        case "template67e":
        case "template68e":
          {
            let height=210;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"242mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
            }
            break;
          }
        case "template104e":
          {
            let height=297;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"297mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            while(numpages>1)
            {
              height=height+1;
              await page.pdf({ path: pdffilepath, printBackground: true, width:"297mm", height:height+"mm",margin: "none" });      
              dataBuffer = fs.readFileSync(pdffilepath);
              pdfParseResult=await pdfParse(dataBuffer);
              numpages=pdfParseResult.numpages;
              console.log(height);
            }
            break;
          }
        case "template107e":
          {
            let height=127;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"180mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            break;
          }
        case "template128e":
          {
            let height = 0;
            let width = 0;
            let numpages=1;
            const browser1 = await puppeteer.launch();
            const page1 = await browser1.newPage();
            await page1.setContent(result_html);
            let dimension = await page1.evaluate(() => {
              const element = document.querySelector('div');
              if (element) {
                  return {
                      width: element.scrollWidth ,
                      height: element.offsetHeight
                  };
                  // width = element.scrollWidth;
                  // height = element.scrollHeight
              }
            });
            await browser1.close();
            width = dimension.width;
            height = dimension.height + 30;
            
            // await page.pdf({ path: pdffilepath, printBackground: true, width: "2000mm", height: "5830mm",margin: "none" });      
            await page.pdf({ path: pdffilepath, printBackground: true, width: width + "px", height: height + "px",margin: "none" });      
            break;
          }
        case "template147e":
          {
            let height=255;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"305mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            break;
          }
        case "template184e":
        case "template150e":
          let height=220;
          let numpages=1;
          await page.pdf({ path: pdffilepath, printBackground: true, width:"273mm", height:height+"mm",margin: "none" });      
          let dataBuffer = fs.readFileSync(pdffilepath);
          let pdfParseResult=await pdfParse(dataBuffer);
          numpages=pdfParseResult.numpages;
          break;
        case "template159e":
          {
            let height=297;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"272mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            break;
          }
        case "template165e":
          {
            let height=270;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"188.5mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            break;
          }
        case "template158e":
          {
            let height=297;              
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });
            break;
          }
        case "template136e":
          {
            let height=297;              
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });
            break;
          }
        case "template185e":
        case "template187e":
        case "template189e":
        case "template190e":
          {
            let height=297.1;
            let numpages=1;
            await page.pdf({ path: pdffilepath, printBackground: true, width:"210mm", height:height+"mm",margin: "none" });      
            let dataBuffer = fs.readFileSync(pdffilepath);
            let pdfParseResult=await pdfParse(dataBuffer);
            numpages=pdfParseResult.numpages;
            break;
          }
        default:
          {
            console.log("A4 portrait");
            await page.pdf({ path: pdffilepath, format: 'A4',printBackground: true,portrait: true,margin: "none" });
          }
      }
     
      await browser.close();
      
      var returnpath={};
      if(isgenerate==false)
      {
        let pdfurl="";
        if(iss3==true)
        { 
          // if(collegeid == "20088" || collegeid == "20108" || collegeid == "20109" ||collegeid == "11") pdfurl = await UploadToGDrive(path, pdffilepath, "pdf", collegeid, this.StorageInformation['gdrivetoken'], this.StorageInformation['gdrivecredential']);
          // switch(puserid.toString()) {
          //   case "20021": // spjimr
          //     {
          //       new_s3_url=await fileUpload(awsinfo.s3obj,awsinfo.awsregion,fullpath,puserid,"mdp/json/"+curyear,awsinfo.s3bucketname);
          //       break;
          //     }
          //   default: {

          //   }
          // }
          // if(collegeid == "20088"|| collegeid == "20108"|| collegeid == "20109"|| collegeid == "11") {
          //   pdfurl = await UploadToGDrive(path, pdffilepath, "pdf", collegeid, this.StorageInformation['gdrivetoken'], this.StorageInformation['gdrivecredential']);
          // }
          // else if(collegeid == "20080") pdfurl=await UploadToFtp(path,pdffilepath, "pdf", "ftp.worldsuccesssyndicate.com", "certificate@arfeenkhanuniversity.com", "certificate@123","https://www.arfeenkhanuniversity.com/verifier/certificatepdf");
          // else if (collegeid == "20110") pdfurl = await fileUploadAzure(pdffilepath,"pdf", this.StorageInformation['azureconnectionstring']);
          // else pdfurl=await fileUploadPdf(fs, path, s3obj,bucket_region,pdffilepath,collegeid,p_BucketKey,bucket_name);
          if(this.StorageInformation.storagetype == 1)
          {        
            pdfurl = await fileUploadPdf(fs, path, s3obj, bucket_region,pdffilepath,collegeid,p_BucketKey,bucket_name);
          }
          else if (this.StorageInformation.storagetype == 2){
            pdfurl = await fileUploadAzure(pdffilepath, p_BucketKey, this.StorageInformation.azureconnectionstring);
          }
          else if (this.StorageInformation.storagetype == 3){
            pdfurl = await UploadToGDrive(path, pdffilepath, p_BucketKey, collegeid, this.StorageInformation.gdrivetoken, this.StorageInformation.gdrivecredential);
          }
          else if (this.StorageInformation.storagetype == 4){
            pdfurl = await UploadToFtp(path,pdffilepath, p_BucketKey, this.StorageInformation.ftphost, this.StorageInformation.ftpuser, this.StorageInformation.ftppassword);
          }
          else if (this.StorageInformation.storagetype == 5){
            if(p_BucketKey=="") p_BucketKey="pdf";
            const contenttype = mime.lookup(pdffilepath);  
            pdfurl = await UploadToLocal(path, pdffilepath, p_BucketKey, this.StorageInformation.baseurl, this.StorageInformation.localstoragepath, contenttype);
            if (pdfurl == "success"){
              pdfurl = `${this.StorageInformation.baseurl}/pdf/${path.basename(pdffilepath).replace(".pdf", "")}`;
            }
          }
          
        }      
        returnpath.pdfurl=pdfurl;
        returnpath.pdffilepath=pdffilepath;
        console.log(returnpath);
        return returnpath;
      }
      else
      {
        returnpath.pdfurl="";
        returnpath.pdffilepath=pdffilepath;
        console.log("During Generate PDF with Common",returnpath);
        return returnpath;
      }

    }
    catch(err)
    {
      console.log(err);
      return "";
    }

  },

  UploadToGDrive : async function(path, filepath, foldername, collegeid, token_path, credential_path, attachname){
    let result = await UploadToGDrive(path, filepath, foldername, collegeid, token_path, credential_path,attachname);
    return result;
  },
  
  UploadToFtp : async function(path, filepath, foldername, ftphost, ftpuser, ftppassword, basereturnurl){
    let result = await UploadToFtp(path, filepath, foldername, ftphost, ftpuser, ftppassword, basereturnurl);
    return result;
  },

  UploadToLocal : async function (path, filepath, subfilepath, baseurl, localstoragepath, contentType="application/json") {
    let result = await UploadToLocal(path, filepath, subfilepath, baseurl, localstoragepath, contentType="application/json");
    return result;
  },
  
  generateVerifyUrl : function (verifyUrl, puserid, student_uuid, cohortname, cohortfullid) {
    var curyear = new Date().getFullYear();
    if (puserid == "20001") {
      let subdir = "";
      if ((cohortname.toLowerCase().indexOf("o21") !== -1 || cohortfullid.toLowerCase().indexOf("o21") !== -1))
        subdir = "O21/";
      else if ((cohortname.toLowerCase().indexOf("j22") !== -1 || cohortfullid.toLowerCase().indexOf("j22") !== -1))
        subdir = "J22/";
      else if ((cohortname.toLowerCase().indexOf("a21") !== -1 || cohortfullid.toLowerCase().indexOf("a21") !== -1))
        subdir = "A21/";
      else if ((cohortname.toLowerCase().indexOf("m22") !== -1 || cohortfullid.toLowerCase().indexOf("m22") !== -1))
        subdir = "M22/";
      verifyUrl = "https://certification.mitwpu.edu.in/verify/" + subdir + student_uuid;
    }
    else if (puserid == "20021") {
      verifyUrl = "https://verification.spjimr.org/verify/mdp/" + curyear + "/" + student_uuid;
    }
    else if (puserid == "20045") {
      verifyUrl = "https://verification.ndimexamination.org/verify/" + curyear + "/" + student_uuid;
    }
    else if (puserid == "20027") {
      verifyUrl = "https://360digitmg.com/verifier/" + student_uuid;
    }
    else if (puserid == "20077") {
      verifyUrl = "https://credentials.nitkkr.ac.in/verifier/" + student_uuid;
    }
    else if (puserid == "20080") {
      verifyUrl = "https://www.arfeenkhanuniversity.com/verifier/verify/" + curyear + "/" + student_uuid;
    }
    else if (puserid == "20081") {
      verifyUrl = "https://digicert.charusat.ac.in/verify/" + curyear + "/" + student_uuid;
    }
    else if(puserid == "20088" || puserid == "20"){
      verifyUrl = "https://certification.ljku.edu.in/verifier/" + student_uuid;
    }
    else if (puserid == "20091" || puserid=="30") {
      verifyUrl = "https://certificates.galgotiasuniversity.edu.in/verify/" + curyear + "/" + student_uuid;
    }
    else if (puserid == "20094") {
      verifyUrl = "https://certification.mietjmu.in/verify/" + curyear + "/" + student_uuid;
    }
    else if (puserid == "20099" || puserid == "11") {
      verifyUrl = "https://verification.cutm.ac.in/verify/" + curyear + "/" + student_uuid;
    }            
    else if(puserid == "20102" || puserid == "24"){
      verifyUrl = `https://verify.gardencity.university/verify/` + student_uuid;
    }
    else if (puserid == "20103" || puserid == "32") {
      verifyUrl = "https://verification.medicaps.ac.in/verify/" + student_uuid;
    }
    else if (puserid == "20107") {
      verifyUrl = "https://verification.cutmap.ac.in/verifyap/" + curyear + "/" + student_uuid;
    }
    else if (puserid == "20108") {
      verifyUrl = "https://digi-record.iilm.ac.in/verify/" + student_uuid;
    }
    else if (puserid == "20109") {
      verifyUrl = "https://digi-record.iilm.edu.in/verify/" + student_uuid;
    }
    else if (puserid == "20110") {
      verifyUrl = "https://verify.jainuniversity.ac.in/verify/" + student_uuid;
    }
    else if (puserid == "20111" || puserid == "26") {
      verifyUrl = "https://deekshaakosh.iiitbhopal.ac.in/verify/" + student_uuid;
    }
    else if (puserid == "20113" || puserid == "19") {
      verifyUrl = "https://verification.dypunik.edu.in/verify/" + student_uuid;
    }
    else if (puserid == "20117") {
      verifyUrl = "https://digi-record.iilmlko.ac.in/verify/" + student_uuid;
    }
    else if (puserid == "20122" || puserid=="25") {                      
      verifyUrl = "https://documentverification.rvce.edu.in/verify/" + student_uuid;
    }
    else {
      if (verifyUrl !== "" && verifyUrl !== null) {
        verifyUrl = verifyUrl + "/verify/" + student_uuid;
      }
      else {
        verifyUrl = "https://www.certonce.com/verify" + student_uuid;
      }
    }
    return verifyUrl;
  },

  StorageInformation: {}
}


async function fileUploadPdf(fs, path, s3obj,bucket_region,bucket_file,collegeid,p_BucketKey,bucket_name="certonce")
{
  
  if(bucket_name=="") return "";
  var uploadParams = {Bucket: bucket_name, Key: '', Body: '', ContentType: 'application/pdf'};
  try
  {
    var fileStream = fs.createReadStream(bucket_file);  
    uploadParams.Body = fileStream;
    //var path = require('path');
    var filename= path.basename(bucket_file);
    var suburl=bucket_key_pdf+collegeid;
    if(p_BucketKey!="")
    {
      suburl=p_BucketKey;
    }
    
    uploadParams.Key = suburl+"/"+filename;
    var data=await s3obj.putObject(uploadParams).promise();        
    var bucket_base_url="https://"+bucket_name+".s3."+bucket_region+".amazonaws.com/";
    return bucket_base_url+suburl+"/"+filename;
  }
  catch(err)
  {
    console.log("err uploading ",err);    
  }
}

async function UploadToFtp(path, filepath, foldername, ftphost, ftpuser, ftppassword, basereturnurl){
  const ftp = require("basic-ftp");
  const client = new ftp.Client();
  let filename = path.basename(filepath);
  let fileIdArr = filename.split(".");  
  let fileId = `${basereturnurl}/${fileIdArr[0]}`;
  try {
    await client.access({
      host: ftphost,
      user: ftpuser,
      password: ftppassword,
    });
    await client.cd(foldername);    
    await client.upload(fs.createReadStream(filepath), filename);
    // await client.uploadFrom(filepath, foldername);    
  } catch (err) {
    console.error(err);
    return "";
  } finally {
    client.close();
    return fileId;
  }
}

async function UploadToLocal(path, filepath, subfilepath, baseurl, localstoragepath, contentType="application/json") {
  while(true) {
    try {
      let base64Content =  fs.readFileSync(filepath);
      let originalFileName = path.basename(filepath);
      if(baseurl.indexOf("credentials.nitkkr.ac.in")!==-1) {
        const httpsAgent = new https.Agent({ rejectUnauthorized: false });
        base64Content = base64Content.toString("base64");
        //fs.writeFileSync("/home/ubuntu/uploadtolocalbase64.json", base64Content);
        const response = await axios.post(`${baseurl}/upload.php`, {file: base64Content, fileName: originalFileName, targetPath: `${localstoragepath}/${subfilepath}`}, {
          maxBodyLength: 104857600, maxContentLength: 104857600, headers: { 'Content-Type':  contentType }, httpsAgent });
        if(response.data.indexOf("successfully")!==-1) return "success";
      }
      else {
        base64Content = base64Content.toString("base64");
        const response = await axios.post(`${baseurl}/upload.php`, { file: base64Content, fileName: originalFileName, targetPath: `${localstoragepath}/${subfilepath}` }, {
          maxBodyLength: 1048576000, maxContentLength: 1048576000, headers: { 'Content-Type':  contentType }});
        if(response.data.indexOf("successfully") !== -1) return "success";
      }
    } catch (error) {
      console.log("UploadToLocal error = ", error.message);
    }
  }
}

function GDriveAuth_old(credentials, token_path) {
  // const {client_secret, client_id, redirect_uris} = credentials.installed || credentials.web;
  const client_secret = credentials.web.client_secret;
  const client_id = credentials.web.client_id;
  const redirect_uris = credentials.web.redirect_uris;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  let token = fs.readFileSync(token_path);
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
}

async function UploadToGDrive(path, filepath, foldername, collegeid, token, credential, attach_name="") {
  try {    
    let auth = GDriveAuth(JSON.parse(credential), token);
    let folderid = await getFolderID(auth, foldername);
    let filename = path.basename(filepath);
    console.log("attach name:", attach_name, filename, folderid);
    if ( attach_name != "" ) filename = attach_name + "_" + filename;
    if ( folderid != "" ) {
      const drive = google.drive({version: 'v3', auth});
      // const existingFiles = await drive.files.list({
      //   q: `'${folderid}' in parents and name = '${filename}' and trashed = false`,
      //   fields: 'files(id)',
      // });
      // for (const file of existingFiles.data.files) {
      //   await drive.files.delete({ fileId: file.id });
      //   console.log(`Deleted existing file: ${file.id}`);
      // }
      // const media = { mimeType: '*/*', body: fs.createReadStream(filepath) };
      // const params = { resource: { name: filename, parents: [folderid] }, media, fields: 'id' };
      // const file = await drive.files.create(params);
      const existingFile = await drive.files.list({
        q: `'${folderid}' in parents and name = '${filename}' and trashed = false`,
        fields: 'files(id)',
      }).then(res => res.data.files[0]);
      const media = { mimeType: '*/*', body: fs.createReadStream(filepath) };
      const method = existingFile ? 'update' : 'create';
      const params = existingFile 
        ? { fileId: existingFile.id, media, resource: { name: filename } }
        : { resource: { name: filename, parents: [folderid] }, media, fields: 'id' };
      const file = await drive.files[method](params);
      if (file && file?.data && file.data.id) {
        console.log("File ID: ", file.data.id, filename);
        return collegeid + "/" + filename;
      }
      else return "";
    }
    else return "";
  }
  catch(err){
    console.log("error in uploading to gdrive: ", err);
    return "";
  }
}

function GDriveAuth(credentials, token) {
  // const {client_secret, client_id, redirect_uris} = credentials.installed || credentials.web;
  const client_secret = credentials.web.client_secret;
  const client_id = credentials.web.client_id;
  const redirect_uris = credentials.web.redirect_uris;
  const oAuth2Client = new google.auth.OAuth2(client_id, client_secret, redirect_uris[0]);
  // Check if we have previously stored a token.
  // let token = fs.readFileSync(token_path);
  oAuth2Client.setCredentials(JSON.parse(token));
  return oAuth2Client;
}

async function createContainer(containername, connectionstring) {
  const blobServiceClient = BlobServiceClient.fromConnectionString(connectionstring);
  const containerClient = blobServiceClient.getContainerClient(containername);
  const createContainerResponse = await containerClient.createIfNotExists();  
  console.log(`Created container ${containername} successfully.`);
}

async function fileUploadAzure(fullPath,containername, connectionstring, subdir="") {
  try
  {
    await createContainer(containername, connectionstring);
    const blobServiceClient = BlobServiceClient.fromConnectionString(connectionstring);
    const containerClient = blobServiceClient.getContainerClient(containername);
    await containerClient.setAccessPolicy("container");
    var fileName = path.basename(fullPath); // Extract the filename from the full path
    if (subdir != "") fileName = `${subdir}/${fileName}`;
    const blockBlobClient = containerClient.getBlockBlobClient(fileName);
    const contenttype = mime.lookup(fullPath);
    console.log(contenttype);    
    
    
    const readableStream = fs.createReadStream(fullPath);

    // Define the options for uploadStream
    const options = { blobHTTPHeaders: { blobContentType: contenttype } };

    // Upload the file
    const uploadBlobResponse = await blockBlobClient.uploadStream(readableStream, undefined, undefined, options);
    //$blobUri = 'https://'.$storageAccountName.'.blob.core.windows.net/'.$container_name.'/'.$file_name;
    var arr = connectionstring.split(";");
    var accountNameArr = arr[1].split("=");
    var accountName = accountNameArr[1];
    var blobUri = `https://${accountName}.blob.core.windows.net/${containername}/${fileName}`;
    console.log(`Uploaded blob ${fileName} successfully, url=${blobUri}`);
    return blobUri;
  }
  catch(err)
  {
    console.error(err);  
    return "";
  }
}

async function getFolderID(auth, foldername){

  const service = google.drive({version: 'v3', auth});
  const files = [];
  var folderId="";
  while(true)
  {
    try {
      const res = await service.files.list({
        q: "name='" + foldername + "' and mimeType = 'application/vnd.google-apps.folder'",
        fields: 'nextPageToken, files(id, name)',
        spaces: 'drive',
      })    
      folderId= res.data.files[0].id;
      break;
    } catch (err) {      
      console.log("getFolderId=",err.message);      
      const fileMetaData = {
        name: foldername,
        mimeType: "application/vnd.google-apps.folder",
      };    
      await service.files.create({
        fields: "id",
        resource: fileMetaData 
      });
    }
  }  
  return folderId;
}