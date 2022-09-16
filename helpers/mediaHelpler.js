const { S3 } = require("aws-sdk");
var nodemailer = require("multer");
const storageformedia = multer.diskStorage({
  destination: "./public/media",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const UploadMedia = multer({
  storage: storageformedia,
  limits: { fileSize: 1000000000 },
});

const s3 = new S3({
  accessKeyId: process.env.AWS_S3_ACCESS_KEY_ID,
  secretAccessKey: process.env.AWS_S3_SECRET_ACCESS_KEY,
});

function UploadMediaToAWS(file) {
  const fileStream = fs.createReadStream(file.path);
  const uploadParams = {
    Bucket: process.env.AWS_S3_BUCKET,
    Body: fileStream,
    Key: file.filename,
  };
  return s3.upload(uploadParams).promise();
}
export default { UploadMediaToAWS };
