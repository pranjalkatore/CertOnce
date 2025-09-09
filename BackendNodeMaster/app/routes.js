var user = require("./User/user.ctrl");
var user_1 = require("./User/user.ctrl_1");
//var daemon = require("./User/daemon");
//daemon();



usernameandpasswordcheck = (req,res,next) =>{
    if(req.body.email && req.body.password)
    {
            next()
    } else{

        if(!req.body.email && !req.body.password)
        {
            var obj = {
                Status: 400,
                message: "Email and password is required"
            }
            res.json(obj)
        }
        else if (!req.body.email)
        {
            var obj = {
                Status: 400,
                message: "Email is  required"
            }
            res.json(obj)
        }
        else 
        {
            var obj = {
                Status: 400,
                message: "Password is required"
            }
            res.json(obj)
        }
       
    }

}

module.exports = function(app,passport,auth)
{
    app.post("/blockchain/introduction",user.introduction);
    app.post('/api/signup',user.signupDetailsCheck,user.signup);
    app.post('/api/uploadstuduents',auth,user.uploadstuduents);    
    app.post('/api/login',usernameandpasswordcheck, passport.authenticate('local-login', {failureRedirect: '/error'}),user.Login); 
    app.get('/error',user.Error);
    app.post("/api/test",auth,user.test);
    app.get("/api/GetPlans",auth,user.GetPlans);
    app.post("/api/stripecharge",auth,user.stripecharge);
    app.get("/email/verify/:id",user.verify);
    app.get("/verify",function(req,res){
        res.render("verify")
    });
    app.get("/api/getProfile",auth,user.getProfile);
    app.post("/api/updateProfile",auth,user.updateProfile);
    app.get("/api/getTransaction",auth,user.getTransaction);
    app.post("/api/forgetpwd",user.forgetpwd);
    app.post("/api/changepassword",auth,user.changepassword);
    app.get("/api/getstudents",auth, user.getStudents);
    app.post("/api/getstudents",auth, user.getStudents);
    app.get("/api/getcohorts",auth, user.getCohorts);
    app.post("/api/getcohorts",auth, user.getCohorts);
    app.post("/api/sendinvitation",auth, user.sendInvitation);
    app.post("/api/generatecertificate",auth, user.generateCertificate);
    //app.post("/api/issuecertificate",auth, user.issueCertificate,user.issueCertificateDaemon);
    app.post("/api/issuecertificate",auth, user.issueCertificate);
               //app.post("/api/issuecertificatedaemon",auth, user.issueCertificateDaemon);
    app.post("/api/previewcertificate",auth, user.previewCertificate);
    app.get("/api/getstudentsforstep",auth, user.getStudentsForStep);
    app.post("/api/getstudentsforstep",auth, user.getStudentsForStep);
    app.post("/api/revokeCertificate",auth, user.revokeCertificate);
    app.post("/api/sendCertificate",auth, user.sendCertificate);
    app.post("/api/sendcertificateforreview",auth, user.sendCertificateforReview);
    app.get("/api/generateAddress",auth,user.generateAddress);
    app.post("/api/updatecertificatetemplate",auth,user.updateCertificateTemplate);
    app.get("/api/fetchcertificatetemplate",auth,user.fetchCertificateTemplate);
    app.post("/api/uploadlogoimage",auth,user.uploadLogoImage);
    app.post("/api/issueconfirm",auth,user.issueconfirm);
    app.post("/api/registerteamuser",auth,user.registerteamuser);
    app.post("/api/updatepermission",auth,user.updatepermission);
    app.post("/api/updatevalidate",auth,user.updatevalidate);
    app.post('/api/uploadphotos',auth,user.uploadphotos);
    app.post('/api/uploadmultiphotos',auth,user.uploadmultiphotos); 
    app.post("/api/bakeopenbadges",auth, user.bakeopenbadges);
    app.post("/api/copyemailaspk",auth, user.copyemailaspk);
    app.post("/api/apiCertOnceGetOpenBadge", user.apiCertOnceGetOpenBadge);
    app.post("/api/apiCertOnceKullarGetOpenBadge", user.apiCertOnceKullarGetOpenBadge);
    app.post("/api/apiverify", user.apiverify);

    app.post("/api/apiRegisterStudent", user.apiRegisterStudent);
    app.get("/api/apiGetCertificate", user.apiGetCertificate);

    app.post("/api/createCohortWithStudents", user.createCohortWithStudents);
    app.post("/api/uploadZipPdf", user.uploadZipPdf);
    app.get("/api/getCohortsByKey", user.getCohortsByKey);
    app.post("/api/generateCertificateByCohort", user.generateCertificateByCohort);  
    app.post("/api/issueCertificateByCohort", user.issueCertificateByCohort);
    app.post("/api/retrieveCertificatesByCohort", user.retrieveCertificatesByCohort);
    app.post("/api/downloadCertificates", user.downloadCertificates);
    app.post("/api/getAllCohortsFromApiKey", user.getAllCohortsFromApiKey);

    app.post("/api/insertReceipientForGS",user.insertReceipientForGS);
    app.post("/blockchain/introductiongs",user.introductiongs);
    app.post("/api/sendinvitationGS",user.sendInvitationGS);
    app.post("/api/getpublickey",user.getpublickey);
    app.post("/api/issueGS",user.issueGS);
    app.post("/api/sendcertificateGS",user.sendCertificateGS);
    app.post("/api/sendscheduledemoGS",user.sendscheduledemoGS);
    app.post("/api/batchprocess",auth, user.batchProcess);
    app.post("/api/updateinformation",auth, user.updateinformation);
    
    app.post("/api/resetcertificate",user.resetCertificate);
    app.post("/api/createCohortWithStudentsByAPI", user.createCohortWithStudentsByAPI);
    app.post("/api/bakeOpenBadgesByAPI", user.bakeOpenBadgesByAPI);
    app.post("/api/retriveOpenBadgesByAPI", user.retrieveOpenBadgesByAPI);
    app.post("/api/registStudentByAPI", user.registStudentByAPI);
    app.post("/api/searchStudentWithOnetimecode", user.searchStudentWithOnetimecode);
    app.post("/api/unhold",auth, user.unhold);
    app.post("/api/createDetailForCompetency", user.createDetailForCompetency);
    app.post('/api/baseauth',usernameandpasswordcheck, passport.authenticate('local-login', {failureRedirect: '/error'}), user.baseauth);
    app.post('/api/zapierBakeOpenbadgeByStudent',usernameandpasswordcheck, passport.authenticate('local-login', {failureRedirect: '/error'}), user.zapierbakeopenbadgebystudent);
    app.post("/api/OpenbadgeCreateCohort", user.OpenbadgeCreateCohort);
    app.post("/api/RetriveOpenbadgeByCohort", user.RetriveOpenbadgeByCohort);
    app.post("/api/generatePreviewCertificate", auth, user.generatePreviewCertificate);
    app.post("/api/bakepreviewopenbadges", auth, user.bakePreviewOpenBadges);
    app.post("/api/createPoliticalInvoice", user.createPoliticalInvoice);
    app.post("/api/getPartners",auth, user.getPartners);
    app.post("/api/getlogoimage",auth, user.getLogoImage);
    app.post("/api/getsignatureimage",auth, user.getSignatureImage);
    app.post("/api/dashboard", auth, user.dashboard);


    app.get("/api/zapiersignin", user.zapiersignin);
    app.get("/api/zapiertrigger", user.zapiertrigger);
    
    
    app.post("/api/requestPdfToEmail", user.requestPdfToEmail);
    app.post("/api/securityStrip", user.securityStrip);
    app.post("/api/publishableKeyStrip", user.publishableKeyStrip);
    app.post("/api/uploadTranscriptPhoto", user.uploadTranscriptPhoto);

    app.post("/api/createCohortWithStudentsForArfeenKhan", user.createCohortWithStudentsForArfeenKhan);
    app.post("/api/retrieveCertificatesForArfeenKhan", user.retrieveCertificatesForArfeenKhan);

    app.post("/api/createMIETDegree", user.createMIETDegree);
    app.post("/api/createMIETTranscript", user.createMIETTranscript);
    app.post("/api/verifyrequest", user.verifyrequest);
    app.post("/api/razorpaymentsendemail", user.razorpaymentsendemail);
    app.post("/api/getverifyrequest", user.getverifyrequest);
    app.post("/api/checkpaymentforverify", user.checkpaymentforverify);
    // app.post("/api/updateissueddate", user.updateissueddate);
    

    app.post("/api/setContactInformation", user.setContactInformation);
    app.post("/api/previewstudentphoto",auth, user.previewStudentPhoto);
    app.post("/api/deletestudent",auth, user.deletestudent);
    app.post("/api/downloadPreviewImage",auth, user.downloadPreviewImage);
    app.get("/api/getOffice365Token", user.getOffice365Token);

    app.post("/api/uploadstudentbyapi",auth, user_1.uploadstudentbyapi);    
    app.post("/api/getbatchurlbyapi",auth, user_1.getbatchurlbyapi);
    app.post("/api/getinfoforstudentpage",user_1.getinfoforstudentpage);
    app.post("/api/insertstudentinputdata", user_1.insertstudentinputdata);
    app.post("/api/updatestudentsinputdata", auth, user_1.updatestudentinputdata);
    app.post("/api/getstudentsinputdata", auth, user_1.getstudentinputdata);

    app.post("/api/sendemailByApi", user_1.sendemailByApi);
    app.post("/api/updatepaymentstateforinsertstudentinputdata", user_1.updatepaymentstateforinsertstudentinputdata);

    app.post("/api/qrCodeFromPdf", user_1.qrCodeFromPdf);

    app.post("/api/verifylog", user_1.verifylog);
    
    // Blockchain API
    app.post("/api/issuebalance", user_1.issueBalance);
}