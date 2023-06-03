import dotenv from "dotenv";
import AWS, { S3 } from "aws-sdk";

dotenv.config();

const ID: string = process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID!;
const SECRET: string = process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY!;

/** aws configuration */
AWS.config.update({
  accessKeyId: ID,
  secretAccessKey: SECRET,
  region: "ap-northeast-2",
});

const s3: S3 = new AWS.S3({
  accessKeyId: ID,
  secretAccessKey: SECRET,
});

/** 날짜 변환 코드 : 이미지 이름에 사용됩니다. */
const currentDateTime: Date = new Date();
const formattedDateTime: string = currentDateTime
  .toISOString()
  .replace(/[-:.TZ]/g, "")
  .replace(/T/g, "-")
  .substring(0, 17);

export default async function uploadImage(
  file: File
): Promise<{ imageUrl: string }> {
  try {
    const fileKey: string = `${formattedDateTime}_${file.name}`;
    console.log(process.env.NEXT_PUBLIC_AWS_BUCKET_NAME);
    const params: S3.PutObjectRequest = {
      Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME!,
      Key: fileKey,
      Body: file,
      ACL: "public-read",
    };
    await s3.upload(params).promise();
    const imageUrl: string = `https://${process.env.NEXT_PUBLIC_AWS_BUCKET_NAME}.s3.amazonaws.com/${fileKey}`;
    return { imageUrl };
  } catch (error) {
    console.error("Image upload failed:", error);
    throw new Error("이미지 업로드에 실패했습니다.");
  }
}
