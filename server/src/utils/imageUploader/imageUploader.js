const {S3Client} = require("@aws-sdk/client-s3");
const multer = require("multer");
const multerS3 = require("multer-s3");
const path = require("path");
const FileExtensionError = require("../errors/FileExtensionError")
const dotenv = require("dotenv");
dotenv.config({path:path.join(__dirname,"/./../../enviroment/aws.env")});

const s3 = new S3Client({
    credentials: {
        accessKeyId: process.env.AWS_ACCESS_KEY_ID,
        secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY
    },
    region: 'ap-northeast-2'
});

const allowedExtensions = ['.png', '.jpg', '.jpeg', '.gif', '.heic', '.bmp'];
const uploadType = {
    "/api/post/image": "post/image",
    "/api/user/profile": "user/profile"
};

const ImageUploader = multer({
    storage: multerS3({
        s3: s3,
        bucket: "deskit-bucket-1",
        key: (req, file, callback) => {
            console.log(req.originalUrl)
            const uploadDirectory = uploadType[req.originalUrl];
            const extension = path.extname(file.originalname);
            if (!allowedExtensions.includes(extension)) {
                return callback(new FileExtensionError("File Wrong Extension Error"));
            }
            callback(null, `${uploadDirectory}/${Date.now()}_${file.originalname}`);
        },
        acl: 'public-read-write'
    })
});

module.exports = ImageUploader;