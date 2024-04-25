import dotenv from 'dotenv';
dotenv.config();
import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import helmet from 'helmet';
import fs from 'fs';
import path from 'path';
import morgan from 'morgan';
import userRoutes from './routes/userRoutes';
import  updateUsersWithEthereumAddresses from './services/updateUserAddresses';
import { setupListeners } from './services/blockchainListeners';


const uploadsDir = path.join(__dirname, "public", "uploads");
if (!fs.existsSync(uploadsDir)) {
  fs.mkdirSync(uploadsDir, { recursive: true });
}

const app = express();

app.use(
  cors({
    exposedHeaders: ["Authorization"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        ...helmet.contentSecurityPolicy.getDefaultDirectives(),
        "img-src": ["'self'", "data:", "localhost:3001"],
      },
    },
    crossOriginResourcePolicy: { policy: "cross-origin" },
  })
);
app.use(express.json());
app.use(morgan("dev"));

app.use("/uploads", express.static("public/uploads"));
app.use("/api/users", userRoutes);

updateUsersWithEthereumAddresses();

setupListeners();

app.use(function (err: Error, req: express.Request, res: express.Response, next: express.NextFunction) {
  console.error(err.stack);
  res.status(500).send("Something broke!");
});

const PORT = process.env.PORT || 3001;

const connectionString:string = process.env.MONGO_URI || "Mongo_DB URI undefined or not working"

mongoose
  .connect(connectionString)
  .then(() => console.log("MongoDB connected"))
  .catch((err: Error) => console.log(err));

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
