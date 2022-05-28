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

  // v1. 단건 수정
  //   const result = await myDocument.updateOne(
  //     {
  //       _id: ObjectId('6291f2ac72298774308e56fc'),
  //     },
  //     {
  //       //   $set: { job: '사황하북' },
  //       job: '사황하북2',
  //     }
  //   );
  //   console.log(result);

  // v2. 다건 수정
  const result = await myDocument.updateMany(
    {
      name: '킹하북',
    },
    {
      job: '캡틴하북',
    }
  );
  console.log(result);
}

main().catch((err) => console.error(err));
