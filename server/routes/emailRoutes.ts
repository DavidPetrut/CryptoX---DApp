import express from 'express';
const router = express.Router();
import User from '../models/User';


router.get("/verify-email", async (req, res) => {
  console.log("hello from verify-email route");
  const { token } = req.query;
  console.log(`Received token for verification: ${token}`);
  try {
    console.log(`Received token for verification: ${token}`);
    const user = await User.findOne({ verificationToken: token });
    console.log(`User found with token: `, user ? "Yes" : "No");
    if (!user) {
      return res
        .status(400)
        .send("Verification failed. Invalid or expired token.");
    }

    user.emailVerified = true;
    user.verificationToken = ""; 
    await user.save();
    console.log(
      `Email verified and user updated in database for: ${user.email}`
    );

    res.json({ success: true, message: "Email verified successfully." });
  } catch (error) {
    console.error("Error verifying email:", error);
    res.status(500).send("Internal server error during email verification.");
  }
});


export default router;