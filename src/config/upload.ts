import aws from "aws-sdk";
import multer from "multer";
import multerS3 from "multer-s3";

const s3 = new aws.S3({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY as string,
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY as string,
  },
});

async function deleteFromS3(key: string) {
  return s3
    .deleteObject({
      Bucket: process.env.AWS_BUCKET as string,
      Key: key,
    })
    .promise();
}

function splitToDeleteS3Object(image_url: string) {
  const bucketSplitted = image_url.split("/");
  const keyOfBucket = bucketSplitted[bucketSplitted.length - 1];
  deleteFromS3(keyOfBucket);
}

const upload = multer({
  storage: multerS3({
    s3,
    bucket: process.env.AWS_BUCKET as string,
    metadata(req, file, cb) {
      cb(null, { fieldName: file.fieldname });
    },
    key(req, file, cb) {
      const splittedArchive = file.mimetype.split("/");
      const extension = splittedArchive[splittedArchive.length - 1];
      cb(null, `${Date.now().toString()}.${extension}`);
    },
  }),
});

export { upload, deleteFromS3, splitToDeleteS3Object };
