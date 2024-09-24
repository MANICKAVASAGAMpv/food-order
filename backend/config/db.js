import mongoose from 'mongoose'

export const connectDB = async() =>{
    await mongoose.connect('mongodb+srv://Manick:Manick@foodsite.mteqwqy.mongodb.net/?').
    then(()=>{
        console.log("Db connected ")
    }).catch((err)=>{
        console.error(err.message)
    })
}