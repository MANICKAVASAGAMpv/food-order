import foodModel from "../models/FoodModel.js";
import fs from "fs"


const addFood  =  async(req,res) =>{

        if(!req.file){
          return res.status(400).send('No file uploaded')
        }
        let image_filename = `${req.file.filename}`;

        const food = new foodModel({
            name: req.body.name,
            description: req.body.description,
            price: req.body.price,
            category: req.body.category,
            image: image_filename
        })

        try{
            await food.save();
            res.json({success:true, message:"Food added"})
        }catch(err){
            console.log(err)
            res.json({success:false,message:"Error"})
        }
}

const listFood = async(req,res) =>{
   try{
     const foods = await foodModel.find({})
     res.json({success:true,data:foods})
   }catch(error){
     console.log(error)
     res.json({success:false,message:"error"})
   }
}

const removeFood = async(req,res)=>{
  try{
     const food = await foodModel.findById(req.body.id)
     fs.unlink(`uploads/${food.image}`, ()=>{})
     await foodModel.findByIdAndDelete(req.body.id)
     res.json({success:true,data:"food removed"})
  }catch(err){
     console.log(err)
     res.json({success:false,message:"error"})
  }
}



export {addFood,listFood,removeFood}