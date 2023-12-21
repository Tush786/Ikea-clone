const { CartModel } = require("../model/cartmodel");

exports.cartDataPost = async (req, res) => {
  const { category_id } = req.body;
  const data = await CartModel.findOne({category_id});
  try{
     if(data){
        return res.send({msg:404})
     }
     const dt=new CartModel(req.body);
     await dt.save();
     res.send({msg:202})
  }catch(err){
    res.send({msg:402})
  }
};



exports.cartDataGet=async(req,res)=>{
  const data=await CartModel.find();
  res.send({data});
}

exports.cartDataDelete=async(req,res)=>{
 try{
  const{category_id}=req.headers;
 await CartModel.deleteOne({category_id})
  res.send({msg:200});
 }catch(err){
  res.send({msg:400})
 }
}
