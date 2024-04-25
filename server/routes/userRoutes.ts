import express from "express";
import authRoutes from './authRoutes';
import profileRoutes from './profileRoutes';
import transactionRoutes from './transactionRoutes';
import emailRoutes from './emailRoutes';

const router = express.Router();

router.use(authRoutes);
router.use(profileRoutes);
router.use(transactionRoutes);
router.use(emailRoutes);


export default router;
