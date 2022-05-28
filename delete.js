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

  // 모델 생성, 여기서  model(1,2) 1: 데이터베이스의  컬렉션
  const myDocument = mongoose.model('document', mySchema);

  // v1. 단건 삭제
  //   const result = await myDocument.deleteOne({
  //     _id: ObjectId('6291d9c6ff5591aeeb20e390'),
  //   });

  //   console.log(result);  // { acknowledged: true, deletedCount: 1 }

  // v2. 다건 삭제
  const result = await myDocument.deleteMany({
    name: /서바이벌/,
  });
  console.log(result); // { acknowledged: true, deletedCount: 2 }
}

main().catch((err) => console.error(err));
