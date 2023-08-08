const express = require('express');
const formidable = require('formidable');
const { ListObjectsCommand, DeleteObjectCommand } = require('@aws-sdk/client-s3');

const { s3, listObjectsBucketParams, deleteObjectBucketParams, uploadFile } = require('../util/aws');
const fs = require('fs');

const router = express.Router();

router.get('/', async (req, res) => {
   try {
      const data = await s3.send(new ListObjectsCommand(listObjectsBucketParams()));

      res.status(200).send(data.Contents.map(item => item.Key));
   } catch (e) {
      res.status(400).send({ error: '이미지 Key 값 가져오기 실패' });
   }
});

router.post('/', async (req, res) => {
   try {
      const fileData = await new Promise((resolve, reject) => {
         const form = new formidable.IncomingForm();

         // formidable로 폼 파싱
         form.parse(req, (err, fields, files) => {
            if (err) return reject(err);
            return resolve({ fields, files });
         });
      });

      const parsedFileData = fileData;

      Object.values(parsedFileData.files).forEach(async item => {
         // fs.createReadStream이용해 스트림 전환 후 올리기
         const fileBuffer = fs.createReadStream(item[0].filepath);
         fileBuffer.on('error', err => console.log(err));

         const fileName = item[0].originalFilename;

         await uploadFile(fileBuffer, fileName, item[0].mimetype);
      });

      return res.status(201).json({
         message: 's3 업로드 성공',
      });
   } catch (e) {
      return res.status(500).json({ error: 's3 업로드 실패' });
   }
});

router.delete('/:id', async (req, res) => {
   try {
      await s3.send(new DeleteObjectCommand(deleteObjectBucketParams(req.params.id)));

      return res.status(200).send('이미지 삭제 완료');
   } catch (e) {
      return res.status(500).json({ error: '이미지 삭제 실패' });
   }
});

module.exports = router;
