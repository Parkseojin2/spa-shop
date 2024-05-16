import mongoose from 'mongoose';
import dotenv from 'dotenv';

dotenv.config();

const connect = () => {
  mongoose
    .connect(process.env.MONGODB_URI, {
      useNewUrlParser: true, useUnifiedTopology: true
    })
    .then(() => console.log('몽고디비 연결 성공'))
    .catch((err) => console.error('몽고디비 연결 실패:', err));
};

mongoose.connection.on('error', (err) => {
  console.error('몽고디비 연결 에러', err);
});

export default connect;
