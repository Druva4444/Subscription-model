import express from "express"   
import mongoose from "mongoose"
import dotenv from "dotenv"
import cookieParser from "cookie-parser"
import AuthRouter from './routers/auth.route.js'
import SubscriptionRouter from './routers/Subscription.route.js'
import './utils/Subscription_update.js'
dotenv.config()

const app = express()
app.use(cookieParser())
app.use(express.json())

app.use("/api/auth", AuthRouter)
app.use('/api/subscriptions',SubscriptionRouter)
mongoose.connect(process.env.MONGO_URI).then(() => console.log("DB connected")).catch((err) => console.log(err))
const port = process.env.PORT || 5000

app.listen(port, () => console.log(`Server is running on port ${port}`))