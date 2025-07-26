const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { uploadFile } = require('../utils/UploadFile');

const router = express.Router();
const upload = multer({ dest: "temp-uploads/" });

router.post("/logo", upload.single("logo"), async (req, res) => {
  try {

    const filePath = req.file.path;
    const s3Url = await uploadFile(filePath, req.file.originalname, req.file.mimetype);
    fs.unlinkSync(filePath); // clean up local file
  res.json({ imageUrl: s3Url });

  } catch (err) {
    console.error("S3 Upload Error:", err);
    res.status(500).json({ error: "Upload failed" });
  }
});

module.exports = router;
