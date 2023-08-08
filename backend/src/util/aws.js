const { S3Client, PutObjectCommand } = require('@aws-sdk/client-s3');
require('dotenv').config();

const awsAccessKey = process.env.MY_AWS_ACCESS_KEY;
const awsSecretKey = process.env.MY_AWS_SECRET_KEY;
const awsS3Bucket = process.env.MY_AWS_S3_BUCKET;
const awsS3BucketRegion = process.env.MY_AWS_S3_BUCKET_REGION;

// s3 클라이언트 연결
const s3 = new S3Client({
   credentials: {
      accessKeyId: awsAccessKey,
      secretAccessKey: awsSecretKey,
   },
   region: awsS3BucketRegion,
});

const listObjectsBucketParams = () => {
   return {
      Bucket: awsS3Bucket,
      Prefix: ``,
   };
};

const deleteObjectBucketParams = fileName => {
   return {
      Bucket: awsS3Bucket,
      Key: fileName,
   };
};

// 파일 업로드
async function uploadFile(fileBuffer, fileName, mimetype) {
   const uploadParams = {
      Bucket: awsS3Bucket,
      Key: fileName,
      Body: fileBuffer,
      ContentType: mimetype,
   };

   const res = await s3.send(new PutObjectCommand(uploadParams));
   return res.$metadata.httpStatusCode;
}

module.exports = {
   s3,
   listObjectsBucketParams,
   deleteObjectBucketParams,
   uploadFile,
};
