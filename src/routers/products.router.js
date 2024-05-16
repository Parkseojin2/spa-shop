
import express from 'express';
import data from '../schemas/product.schema.js';



// Express.js의 라우터를 생성합니다.
const router = express.Router();



/** 상품 등록 **/
// localhost:3000/api/products POST
router.post('/products', async (req, res) => {
  const { name, description, manager, password} = req.body;

  const existingProduct = await data.findOne({ name }).exec();
  if (existingProduct) {
    return res.status(400).json({ errMessage: "이미 등록된 상품입니다." });
  }

  if(!name || !description || !manager || !password){
  return res.status(400).json({errMessage:"상품 정보를 모두 입력해주세요."})
  };

  const productMacOrder = await data.findOne().sort('-order').exec();
  const order = productMacOrder ? productMacOrder.order + 1 : 1;
  
 const product = new data({ name, description, manager, password, order})
 await product.save();


 
return res.status(201).json({status: 201, message:'상품 생성에 성공했습니다.', data: product });

}); 

router.get('/products', async(req, res) => {
  const products = await data.find({}, '-password').sort('-order').exec();

  if(!products) {
    return res.status(400).json([])
  }
  return res.status(200).json({products});

 
})

router.get('/products/:id', async(req, res) => {
  const productId = req.params.id;
  const product = await data.findById(productId, '-password').exec();
  
  if (!product) {
    return res
      .status(404)
      .json({ errorMessage: '상품이 존재하지 않습니다.' });
  }

  return res.status(200).json({ status:200, message:"상품 상세 조회에 성공했습니다.", product });
})
    

router.put('/products/:id', async (req, res) => {
  const productId = req.params.id;
 const { name, description, manager, password } = req.body;

 

  const product = await data.findById(productId).exec();
  if(!product) {
    return res.status(404).json({ errorMessage:'상품이 존재하지 않습니다.'});
  }

  if(!password){
    return res.status(400).json({ errorMessage: '비밀번호를 입력해주세요.'})
  }


  if (password !== product.password) {
    return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
  }

  product.name = name;
  product.description = description;
  product.manager = manager;
 


  await product.save();

  return res.status(200).json({status: 200, message: "상품 수정에 성공했습니다.", data:product})

})


router.delete('/products/:id', async (req, res) => {
  // 삭제할 '해야할 일'의 ID 값을 가져옵니다.
  const productId = req.params.id;
  const {password} = req.body;

// 삭제할 해야할 일을 가져옵니다.
  const product = await data.findById(productId).exec();
 
 
 
 
  if (!product) {
    return res
      .status(404)
      .json({ errorMessage: '존재하지 않는 상품입니다.' });
  }

  if(!password){
    return res.status(400).json({ errorMessage: '비밀번호를 입력해주세요.'})
  }

  if (password !== product.password) {
    return res.status(401).json({ errorMessage: '비밀번호가 일치하지 않습니다.' });
  }

  // 조회된 '해야할 일'을 삭제합니다.
  await data.deleteOne({ _id: productId }).exec();

  return res.status(200).json({});
});


export default router;

