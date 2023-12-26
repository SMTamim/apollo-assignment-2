import express, { Request, Response } from "express";
import { json } from "stream/consumers";
import cors from "cors";
import { UserRoutes } from "./modules/user.route";

const app = express();
app.use(express.json());
app.use(cors());

app.get("/", (req, res) => {
  res.send("Hello World!");
});

app.use("/api/users", UserRoutes);

export default app;
