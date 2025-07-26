const { Upload } = require('@aws-sdk/lib-storage');
const fs = require('fs');
const s3Client = require('./s3');

async function uploadFile(filePath, fileName, contentType) {
  const fileStream = fs.createReadStream(filePath);

  const upload = new Upload({
    client: s3Client,
    params: {
      Bucket: "quotation-bucket-for-logo",
      Key: `logos/${Date.now()}_${fileName}`,
      Body: fileStream,
      ContentType: contentType,
    },
  });
  console.log("S3 Region:", s3Client.config.region); // should log: us-east-1


  upload.on("httpUploadProgress", (progress) => {
    console.log("S3 Region:", s3Client.config.region); // should log: us-east-1

    console.log("Upload progress:", progress);
  });

  const result = await upload.done();
  console.log(result.Location);
  return result.Location;
}

module.exports = { uploadFile };
