// backend/lib/s3Client.js
const { S3Client } = require("@aws-sdk/client-s3");
require("dotenv").config();

const s3Client = new S3Client({
  region: "us-east-1", // hardcode to avoid .env issues
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
  },
  forcePathStyle: false, // optional but usually best for AWS S3
});

module.exports = s3Client;
