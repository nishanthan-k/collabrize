import express from "express";
import cors from "cors";
import { config } from "./configs/envConfig";
import { generateAuthToken } from './utils/auth'

const app = express();
const port = config.app.port;

const corsOptions = {
  origin: ["http://localhost:5173"],
  credentials: true,
};

if (config.app.environment === "production") {
  corsOptions.origin = ["https://collabrize.vercel.app"];
}

app.use(cors(corsOptions));
app.use(express.json());

console.log('config', config, config.auth.jwtSecret)

// generateAuthToken({email: 'hello', role: 'admin'});

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
