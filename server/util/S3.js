require("dotenv").config();
const fs = require("fs");
const S3 = require("aws-sdk/clients/s3");

const s3 = new S3({
  region: process.env.AWS_BUCKET_REGION,
});

// export a function that can receive the file object from multer, and then upload it to the S3 bucket
const uploadFile = function (file) {
  const fileStream = fs.createReadStream(file.path);

  return s3
    .upload({
      Bucket: process.env.AWS_BUCKET_NAME,
      Body: fileStream,
      Key: file.filename,
    })
    .promise();
};

module.exports = { uploadFile };
