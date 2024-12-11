import cors from "cors";
import express from "express";
import { config } from "./configs/envConfig";
import authMiddleware from "./middlewares/auth.middleware";
import { domain } from "./utils/constants";
import { errorHandler } from "./utils/errorHandler";
import { connectDB, disConnectDB } from "./configs/psqlDB";
import authRouter from './routes/auth.route';

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
