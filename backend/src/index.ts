import cors from "cors";
import express from "express";
import { config } from "./configs/envConfig";
import authMiddleware from "./middlewares/auth.middleware";
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

// middlewares
app.use(authMiddleware.validateToken);

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.use(errorHandler);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
