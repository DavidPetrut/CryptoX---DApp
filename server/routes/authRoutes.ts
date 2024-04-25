import express from 'express';
const router = express.Router();
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken';
import User from '../models/User';
import axios from 'axios';
import { sendVerificationEmail } from '../services/emailVerification';
import crypto from 'crypto';


const dotenvVariable:string = process.env.JWT_SECRET || "not working"
const secretKey:string = process.env.RECAPTCHA_KEY || "recaptcha secret not working"

  router.post("/login", async (req, res) => {
    const email = req.body.email.trim();
    const password = req.body.password.trim();
  
    console.log("Login request body:", { email, password: "[REDACTED]" });
  
    try {
      const user = await User.findOne({ email: email });
      console.log("User found:", user ? "Yes" : "No", "for email:", email);
      if (!user) {
        console.log("User not found:", email);
        return res.status(400).json({ message: "User does not exist" });
      }
  
      if (!user.emailVerified) {
        console.log("Email not verified:", email);
        return res.status(401).json({ message: "Email has not been verified" });
      }
  
      console.log("Email verified:", user.emailVerified ? "Yes" : "No");
  
      const isMatch = await bcrypt.compare(password, user.password);
      console.log("Password comparison result:", isMatch, "for user:", email);
  
      if (!isMatch) {
        return res.status(400).json({ message: "Invalid credentials" });
      }
  
      const token = jwt.sign({ userId: user._id }, dotenvVariable, {
        expiresIn: "24h",
      });
      console.log("Login successful for:", email);
      res.json({
        token,
        username: user.username,
        email: user.email,
        profileImage: user.profileImage,
      });
    } catch (error) {
      console.error("Error on login:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });
  
  router.post("/register", async (req, res) => {
    const { username, email, password, recaptchaResponse } = req.body;
  
    console.log("Register request body:", {
      username,
      email,
      password: "[REDACTED]",
      recaptchaResponse,
    });
  
    if (!recaptchaResponse) {
      return res.status(400).json({ message: "reCAPTCHA token missing" });
    }
  
    try {
      const recaptchaVerifyResponse = await axios.post(
        `https://www.google.com/recaptcha/api/siteverify?secret=${secretKey}&response=${recaptchaResponse}`
      );
  
      if (!recaptchaVerifyResponse.data.success) {
        return res.status(400).json({ message: "reCAPTCHA verification failed" });
      }
  
      let userExists = await User.findOne({ $or: [{ email }, { username }] });
      console.log("User exists check:", userExists ? "Yes" : "No");
      if (userExists) {
        return res
          .status(400)
          .json({ message: "User already exists with this email or username" });
      }
  
      const verificationToken = crypto.randomBytes(20).toString("hex");
  
      console.log(
        "Password before hashing in Registering with password:",
        password
      );
  
      const user = new User({
        username,
        email,
        password,
        verificationToken,
      });
  
      await user.save();
  
      console.log("User created and verification email sent.");
  
      sendVerificationEmail(email, verificationToken);
  
      const authToken = jwt.sign({ userId: user._id }, dotenvVariable, {
        expiresIn: "1h",
      });
      res.status(201).json({ token: authToken });
    } catch (error) {
      console.error("Error during registration:", error);
      res.status(500).json({ message: "Internal server error" });
    }
  });


  export default router;