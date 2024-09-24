import express from "express"
import authMiddleWare from '../middleware/auth.js'
import { listOrders, placeOrder, updateStatus, userOrders, verifyOrder } from "../controllers/orderControllers.js"


const orderRouters = express.Router()

orderRouters.post("/place",authMiddleWare,placeOrder)

orderRouters.post("/verify",verifyOrder)

orderRouters.post("/userorders",authMiddleWare,userOrders)

orderRouters.get("/list",listOrders)

orderRouters.post("/status", updateStatus)

export default orderRouters

