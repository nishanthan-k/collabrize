import cors from "cors";
import express from "express";
import { config } from "./src/lib/configs/envConfig";
import { connectDB, disConnectDB } from "./src/lib/configs/psqlDB";
import authMiddleware from "./src/middlewares/auth.middleware";
import authRouter from './src/routes/auth.route';
import orgRouter from './src/routes/org.route';
import userRouter from './src/routes/user.route';
import { domain, frontendDevDomain, frontendProdDomain } from "./src/utils/constants";
import { errorHandler } from "./src/utils/errorHandler";

const app = express();
const port = config.app.port;

const corsOptions = {
  origin: [domain, frontendDevDomain,  frontendProdDomain],
  credentials: true,
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization'],
};

app.use(cors(corsOptions));
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Server is running no issues");
});

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
