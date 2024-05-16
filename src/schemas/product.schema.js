

import mongoose from 'mongoose';

// 상품(goods)에 대한 정보를 나타내는 스키마를 정의합니다.
const goodsSchema = new mongoose.Schema({

  name: {
    type: String, // 상품의 이름을 나타냅니다.
    required: true,
    uniqe: true, // 필수 항목입니다.
  
  },
  description: {
    type: String,
    required: true, // 상품의 설명.
  },
  manager: {
    type: String,
    required: true, // 상품을 등록한 사람 이름.
  },
  password:{
    type:String,
    required: true,
  },

  status: {
    type: String,
    enum: ['FOR_SALE', 'SOLD_OUT'],
    default: 'FOR_SALE',
  },

  createdAt:{
    type: Date,
    default: Date.now,
  },

  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

// 위에서 정의한 스키마를 이용하여 'Goods'라는 이름의 모델을 생성합니다.
export default mongoose.model('Products', goodsSchema);