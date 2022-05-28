import mongoose from 'mongoose';
import * as dotenv from 'dotenv';
import { ObjectId } from 'mongodb';
dotenv.config();

const { Schema } = mongoose;

async function main() {
  const connect = await mongoose.connect(process.env.DB_URL, {
    dbName: process.env.DB_DATABASE,
  });
  console.log('연결 완료');

  // 스키마 생성
  const mySchema = new Schema({
    _id: ObjectId,
    name: String,
    job: String,
    inner: [[String] | String],
  });

  // ObjectId 추가 ...
  //   mySchema.path('_id');

  // 모델 생성
  const myDocument = mongoose.model('document', mySchema);

  // v1. 단건-다건 추가
  const result = await myDocument.insertMany({
    name: '서바이벌 하북',
    job: '파이터',
  });

  console.log(result);
}

main().catch((err) => console.error(err));
