import mongoose from "mongoose";
const subscriptionSchema = new mongoose.Schema({
  userId: { 
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user'
   },
  planId: { 
    type: mongoose.Schema.Types.ObjectId, 
    ref: 'Plan' 
  },
  startDate: { 
    type: Date, 
    default: Date.now 
  },
  endDate: { 
    type: Date 
  },
  status: { 
    type: String, 
    enum: ['active', 'cancelled','expired','inactive'], 
    default: 'active' 
  }
});

const Subscription = mongoose.model('Subscription', subscriptionSchema);
export default Subscription
  