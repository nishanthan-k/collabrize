import express from "express";
import cors from "cors";
import { config } from "./configs/envConfig";
import { generateAuthToken, verifyAuthToken } from './utils/auth'
import { domain } from "./utils/constants";

const app = express();
const port = config.app.port;

const corsOptions = {
  origin: [domain],
  credentials: true,
};

app.use(cors(corsOptions));
app.use(express.json());

console.log('token --->', generateAuthToken({email: 'hello', role: 'admin'}));
console.log('valid token --->', verifyAuthToken('eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImhlbGxvIiwicm9sZSI6ImFkbWluIiwiaWF0IjoxNzMzNzYxODkzLCJleHAiOjE3MzM3NjU0OTN9.GSUBK0g7aBslL2pZ-LZIqVIMTeKKnk87DGCJGBg53A'));

app.get("/", (req, res) => {
  res.send("Hello, Express with TypeScript!");
});

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
