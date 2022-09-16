const path= require('path');
const multer= require('multer');
const fs= require('fs');
const S3 = require('aws-sdk/clients/s3')

const storageForMedia = multer.diskStorage({
    destination: './public/media',
    filename: function(req, file, cb){
        cb(null, file.fieldname + '-' + Date.now() + path.extname(file.originalname));
    }
});

const UploadBanner = multer({
    storage: storageForMedia,
    limits:{fileSize: 1000000}
});

const s3 = new S3({
 accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
 secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY
})   

function UploadMediaToAWS(file) {
    const fileStream = fs.createReadStream(file.path)

    const uploadParams = {
        Bucket: process.env.AWS_S3_BUCKET,
        Body: fileStream,
        Key: file.filename
    }

    return s3.upload(uploadParams).promise();
}

module.exports = {
  UploadBanner,
  UploadMediaToAWS,
};