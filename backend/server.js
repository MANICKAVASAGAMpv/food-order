import express from "express"
import cors from "cors"
import { connectDB } from "./config/db.js"
import foodRouter from "./routes/foodRoutes.js"
import multer from "multer"
import userRouter from "./routes/userRoutes.js"
import cartRouter from "./routes/cartRouters.js"
import orderRouters from "./routes/orderRouters.js"


const app = express()
const port = 4000

app.use(express.json())
app.use(cors())

connectDB()


app.use("/api/food",foodRouter)

app.use("/images", express.static("uploads"))

app.use("/api/user",userRouter)

app.use('/api/cart',cartRouter)

app.use('/api/order',orderRouters)

app.listen(port, ()=>{
        console.log(`Server started on http://localhost:${port}`)
})