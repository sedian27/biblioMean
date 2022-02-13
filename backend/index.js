import express from "express";
import cors from "cors";
import dotenv from "dotenv";

import db from "./db/db.js";
import roleRoutes from "./routes/role.js";

dotenv.config();

const app = express();
app.use(express.json());
app.use(cors());

app.listen(process.env.PORT, () => {
  console.log("Backend server running on port: ", process.env.PORT);
});

app.use("/api/role", (req, res) => {
  res.send("hola mundo!");
});

app.use("/api", (req, res) => {
  res.send("hola mundo!");
});

db.dbConnection();
