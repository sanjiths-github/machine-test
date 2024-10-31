import express from "express"
import cors from 'cors'
import mongoose from "mongoose"
import dotenv from "dotenv"
import pdfRoutes from './routes/pdfRoutes.js'


 dotenv.config()
 const app = express()

//connect MONGODB

 const connect = async() => {

    try {
        await mongoose.connect(process.env.MONGO)
        console.log("Backend is connected")
        
    } catch (error) {
        console.log("error in mongodb")
        
    }

}

connect()






app.use(cors())
app.use(express.json())



//routes

app.use("/api/pdfUpload",pdfRoutes)


const PORT = process.env.PORT 

app.listen(PORT,()=>{
    console.log(`server running on ${PORT}`)
})