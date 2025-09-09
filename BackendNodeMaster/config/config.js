

module.exports = {
    port: 5000,
    https_port: process.env.HTTPS_PORT,
    SECRET: process.env.SECRET,       
    isverify:process.env.VERIFY_URL,
    //isverify:"http://localhost:5000/email/verify/",
    accessKeyId:process.env.ACCESS_KEY_ID,
    secretAccessKey:process.env.SECRET_ACCESS_KEY,
    region:process.env.REGION,
    bucket_name:process.env.BUCKET_NAME,
    kmsKeyId:process.env.KMS_KEY_ID,
}
