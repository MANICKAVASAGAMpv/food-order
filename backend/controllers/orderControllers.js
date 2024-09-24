import orderModel from "../models/orderModel.js";
import userModel from '../models/userModels.js'
import Stripe from "stripe"

const stripe = new Stripe("sk_test_51Py9aLRrDpAnbiSgw4OCW6RGa3oLbWXUKfYip6L8oZ0IFUsckRe59ZVs7rRnXUb5KffJfyX5UH3wGzPGxAeBYqsW00IMlF1HCv")

const frontend_url = "http://localhost:5174"

const placeOrder = async (req, res) => {
    try {
        const newOrder = new orderModel({
            userId : req.body.userId,
            items: req.body.items,
            amount:req.body.amount,
            address:req.body.address
        })

        await newOrder.save()
        await userModel.findByIdAndUpdate(req.body.userId,{cartData:{}})

        const line_items = req.body.items.map((items)=>({
            price_data:{
                currency:"inr",
                product_data:{
                    name:items.name
                },
                unit_amount:items.price*100*80
            },
            quantity:items.quantity
        })) 

        line_items.push({
            price_data:{
                currency:"inr",
                product_data:{
                    name:"Delivery Charged"
                },
                unit_amount:2*100*80
            },
            quantity:1
        })

        const session = await stripe.checkout.sessions.create({
            line_items:line_items,
            mode:"payment",
            success_url:`${frontend_url}/verify?success=true&orderId=${newOrder._id}`,
            cancel_url:`${frontend_url}/verify?success=false&orderId=${newOrder._id}`
        })

        res.json({success:true,session_url:session.url})

    } catch (error) {
        console.log(error)
        res.json({success:false,message:"error"})
    }

}

const verifyOrder = async(req,res) =>{
    const{orderId, success} = req.body
    try{
        if(success == "true"){
            await orderModel.findByIdAndUpdate(orderId,{payment:true})
            res.json({success:true,message:"paid"})
        }else{
            await orderModel.findByIdAndDelete(orderId, {payment:false})
            res.json({success:false,message:"Not paid"})
        }
    }catch(error){
            console.log(error)
            res.json({success:false,message:"error"})
    }
}

const userOrders =  async(req,res) =>{
    try{
        const orders = await orderModel.find({userId : req.body.userId})
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

const listOrders = async(req,res) =>{
    try{
        const orders = await orderModel.find({});
        res.json({success:true,data:orders})
    }catch(error){
        console.log(error)
        res.json({success:false,message:"error"})
    }
}

const updateStatus =  async(req,res)=>{
    try{
        await orderModel.findByIdAndUpdate(req.body.orderId,{status:req.body.status})
        res.json({success:true,message:"Status updated"})
    }catch(error){
        console.log(err)
        res.json({success:false,message:"error"})
    }
}

export { placeOrder, verifyOrder , userOrders, listOrders,updateStatus}