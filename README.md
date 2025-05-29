# 📘 Backend Subscription System Documentation

## 📁 Project Structure Overview

```
backend/
├── models/
│   ├── User.model.js
│   ├── Plan.model.js
│   └── Subscription.model.js
├── middleware/
│   ├── checkAuth.js
│   └── checkAdmin.js
├── controllers/
│   ├── auth.controller.js
│   └── subscription.controller.js
├── routes/
│   └── auth.route.js
    └── Subscription.route.js
├── utils/
│   └── Subsscription_update.js
    └── Users.seed.js
├── .env
├── index.js
└── package.json
```

## 📦 Installation

```bash
npm install
```

### Required Environment Variables (`.env`)

* `MONGO_URI`: MongoDB connection string
* `JWT_SECRET`: Secret key for JWT
* `PORT`: Port number to run on 

---

## 🔐 Authentication & Authorization

### 🔹 Signup / Login / Logout

Located in `controllers/auth.controller.js`:

* `POST api/auth/signup` - Registers a new user
* `POST api/auth/login` - Authenticates a user and sets a JWT in cookies
* `GET api/auth/logout` - Clears cookies to logout

### 🔹 Middleware: `checkauth`

Path: `middleware/checkAuth.js`

* Validates JWT from cookies
* Adds `req.user` if valid
* Returns 401 if invalid or missing

### 🔹 Middleware: `checkAdmin`

Path: `middleware/checkAdmin.js`

* Allows access only if `req.user.role === 'admin'`

---

## 📁 Models

### 🔸 User.model.js

```js
const userschema = new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true
    },
    role:{
        type:String,
        default:"user"
        
    }
})
```

### 🔸 Plan.model.js

```js
const planSchema = new mongoose.Schema({
    name: String,
    price: Number,
    durationDays: Number,
    features:String,
    CreatedBy:String
  });
```

### 🔸 Subscription.model.js

```js
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
```

---

## 🌐 API Endpoints

### 🔐 Auth Routes

```http
POST   api/auth/signup            → Register user
POST   api/auth/login             → Login and receive JWT cookie
GET    api/auth/logout            → Logout and clear cookie
```

### 📦 Plan Routes

```http
POST   /api/subscriptions/createPlan        → [Admin Only] Create a plan
GET    /api/subscriptions/plans             → [User] Get all plans
```

### 🧾 Subscription Routes

```http
POST   /api/subscriptions/subscriptions             → [User] Subscribe to a  plan using planId
GET    /api/subscriptions/subscriptions/:userId    → [User] Get user's subscriptions
PUT    /api/subscriptionssubscriptions/:userId    → [User] Update subscription status
DELETE /api/subscriptions/subscriptions/:userId    → [User] Delete a subscription
```

---

## 🔄 Cron Job

### 🔹 Purpose

Periodically check all subscriptions. If `endDate < currentDate`, change status to `expired`.

### 🔹 File: `utils/subscription_update.js`

```js
import cron from 'node-cron';
import Subscription from '../models/Subscription.model.js';

cron.schedule('0 * * * *', async () => { 
  const now = new Date();
  await Subscription.updateMany(
    { endDate: { $lt: now }, status: 'active' },
    { $set: { status: 'inactive' } }
  );
  console.log('Checked and updated expired subscriptions');
});
```

---

## ✅ Summary

* Fully working backend for subscription-based system.
* JWT authentication, role-based access control.
* CRUD for Plans and Subscriptions.
* Background cron job for subscription status.
* Ready to scale or integrate with a frontend (React, etc).

---

## 🚀 Start Server

```bash
node server.js
```

---

## 🧪 Seed File (Optional)

To insert fake users:

```bash
node utils/Users.seed.js
```

