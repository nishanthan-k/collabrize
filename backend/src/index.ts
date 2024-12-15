import cors from "cors";
import express from "express";
import { config } from "./lib/configs/envConfig";
import { connectDB, disConnectDB } from "./lib/configs/psqlDB";
import authMiddleware from "./middlewares/auth.middleware";
import authRouter from './routes/auth.route';
import orgRouter from './routes/org.route';
import userRouter from './routes/user.route';
import { domain } from "./utils/constants";
import { errorHandler } from "./utils/errorHandler";

const app = express();
const port = config.app.port;

const corsOptions = {
  origin: [domain],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

app.use('/api/auth', authRouter);

// middlewares
app.use(authMiddleware.validateToken);

// routes
app.use('/api/user', userRouter);
app.use('/api/org', orgRouter);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.use(errorHandler);

connectDB()
  .then(() => {
    app.listen(port, () => {
      console.log(`Server listening on ${port}`);
    })
  })
  .catch((error) => {
    console.log('Failed to connect to DB', error);
    process.exit(1);
  })

process.on("SIGNINT", async () => {
  await disConnectDB();
  process.exit(1);
})
