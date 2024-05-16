// app.js

import dotenv from "dotenv";
import express from 'express';
import productsRouter from './src/routers/products.router.js'
import connect from './src/schemas/index.js';

dotenv.config();
const app = express();



app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (req, res) => {
  res.send('Hello World!');
});

app.use('/api', [productsRouter]);


const productServer = async () => {
  const PORT = process.env.PORT || 3000;
  connect();
  
  app.listen(PORT, () => {
    console.log(`${PORT} 에서 열렸습니다.`);
  });
};

productServer();
