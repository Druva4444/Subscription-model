import mongoose from 'mongoose';
import cron from 'node-cron';
import dotenv from 'dotenv';
import Subscription from "../models/Subsciption.model.js"

dotenv.config();

mongoose.connect(process.env.MONGO_URI).then(() => {
  console.log(' MongoDB connected for cron');
}).catch(err => {
  console.error('MongoDB connection error:', err);
});
cron.schedule('0 0 * * *', async () => {
  console.log('🔄 Running subscription status check...');

  try {
    const result = await Subscription.updateMany(
      {
        endDate: { $lt: new Date() },
        status: 'active'
      },
      { $set: { status: 'inactive' } }
    );

    console.log(` Updated ${result.modifiedCount} subscriptions to inactive.`);
  } catch (error) {
    console.error(' Error updating subscriptions:', error);
  }
});
