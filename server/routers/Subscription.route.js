import express from "express"
import {checkauth,} from '../middleware/checkAuth.js'
import {checkAdmin} from '../middleware/checkAdmin.js'
const router = express.Router();
import {createSubscription,createPlan,getSubscriptions,updateSubscription,deleteSubscription,getPlans} from '../controllers/Subscription.controller.js'
router.post('/subscriptions',checkauth,createSubscription)
router.post('/createPlan',checkAdmin,createPlan)
router.get('/subscriptions/:userId',checkauth,getSubscriptions)
router.put('/subscriptions/:userId',checkauth,updateSubscription)
router.delete('/subscriptions/:userId',checkauth,deleteSubscription)
router.get('/plans',checkauth,getPlans)
export default router