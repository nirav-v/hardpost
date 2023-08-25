const crypto = require("crypto");
const fs = require("fs");

require("dotenv").config();
// const S3 = require("aws-sdk/clients/s3");
const { S3Client, PutObjectCommand } = require("@aws-sdk/client-s3");
const sharp = require("sharp");

// export a function that can receive the file object from multer, and then upload it to the S3 bucket
const uploadFile = async function (file) {
  const client = new S3Client({
    region: process.env.AWS_BUCKET_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    },
  });

  // function for generating random filename ending using crypto module
  const generateRandomFileName = (bytes = 32) =>
    crypto.randomBytes(bytes).toString("hex");

  // rename file to original name + the randomly generated sequence
  const filename = file.originalname + generateRandomFileName();

  // function to resize the incoming image buffer stream using sharp npm package
  const resizedBuffer = await sharp(file.buffer)
    .resize({
      height: 1920,
      width: 1080,
      fit: "contain",
    })
    .toBuffer();

  const command = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: filename,
    Body: resizedBuffer,
    ContentType: file.mimetype,
  });

  const s3UploadResult = await client.send(command);

  return { s3UploadResult, filename };
};

module.exports = { uploadFile };
