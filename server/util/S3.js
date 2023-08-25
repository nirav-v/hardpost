const crypto = require("crypto");
const fs = require("fs");

require("dotenv").config();
// const S3 = require("aws-sdk/clients/s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");

const s3 = new S3Client({
  region: process.env.AWS_BUCKET_REGION,
});

const generateRandomFileName = (bytes = 32) =>
  crypto.randomBytes(bytes).toString("hex");

// export a function that can receive the file object from multer, and then upload it to the S3 bucket
const uploadFile = async function (file) {
  // const fileStream = fs.createReadStream(file.path);

  // return s3
  //   .upload({
  //     Bucket: process.env.AWS_BUCKET_NAME,
  //     Body: fileStream,
  //     Key: file.filename,
  //   })
  //   .promise();

  const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  const filename = file.originalname + generateRandomFileName();

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: file.buffer,
    ContentType: file.mimetype,
  });

  const s3UploadResult = await client.send(command);

  return { s3UploadResult, filename };
};

module.exports = { uploadFile };
