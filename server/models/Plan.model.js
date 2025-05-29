import mongoose from "mongoose";
const planSchema = new mongoose.Schema({
    name: String,
    price: Number,
    durationDays: Number,
    features:String,
    CreatedBy:String
  });
  
  const  plan = mongoose.model('Plan', planSchema);
  export default plan