import express from "express"
import jwt from 'jsonwebtoken'

export async function checkAdmin(req, res, next) {
    try {
        const token = req.cookies.UID;

        if (!token) {
            return res.status(401).json({ message: "Unauthorized: No token provided" });
        }

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; 
        console.log('passed middleware ')
        if(decoded.role!=='admin'){
            return res.status(401).json({ message: "NO privilage to add a new plan" });
        }
        next();  
    } catch (error) {
        console.error("JWT Error:", error.message);

        if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
            return res.status(401).json({ message: "Unauthorized: Invalid or expired token" });
        }

        return res.status(500).json({ message: "Something went wrong with the server" });
    }
}
