import user from "../models/User.model.js";
import Subscription from "../models/Subsciption.model.js"
import Plan from "../models/Plan.model.js";
import mongoose from "mongoose";
export async function createSubscription(req,res){
    try {
        const { planId } = req.body;
        if (!planId || !mongoose.isValidObjectId(planId)) {
            return res.status(400).json({ message: "Invalid or missing planId" });
        }
  const plan = await Plan.findById(planId);
  if (!plan) return res.status(404).send('Plan not found');

  const startDate = new Date();
  const endDate = new Date(startDate);
  endDate.setDate(startDate.getDate() + plan.durationDays);

  const subscription = new Subscription({
    userId: req.user.id,
    planId,
    startDate,
    endDate,
  });

  await subscription.save();
  res.status(201).json(subscription);
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong"})
    }
}
export async function createPlan(req,res){
    try {
        const {name,price,durationDays} = req.body;
        const plan = await Plan.create({name,price,durationDays,CreatedBy:req.user.id});
        res.status(201).json(plan);
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

export async function getSubscriptions(req,res){
    try {
        const userId=req.params.userId;
        const subscriptions = await Subscription.find({ userId })
    .populate('planId', 'name')   
    .populate('userId', 'name'); 

        res.status(200).json(subscriptions);
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong"})
    }
}

export async function updateSubscription(req,res){
    try {
        const userId = req.params.userId;
        const {newStatus} = req.body;
        if(newStatus!=='active' && newStatus!=='cancelled' && newStatus!=='expired' && newStatus!=='inactive'){
            return res.status(400).json({message:"Invalid status"})
        }
        const Subsciption = await Subscription.findOne({userId});
        Subsciption.status = newStatus;
        const updatedSubscription = await Subsciption.save();
        res.status(200).json(updatedSubscription);
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong"})
    }
}
export async function deleteSubscription(req,res){
    try {
        const userId = req.params.userId;
        const Subsciption = await Subscription.findOneAndDelete({userId});
        res.status(200).json(Subsciption);
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong"})
    }
}
export async function getPlans(req,res){
    try {
        const plans =await Plan.find({});
        res.status(200).json(plans);
    } catch (error) {
        console.log('error',error)
        return res.status(500).json({message:"Something went wrong with server"})
    }
}