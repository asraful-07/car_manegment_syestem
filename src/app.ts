import express from "express";
import cors from "cors";
import { auth } from "./lib/auth";
import { toNodeHandler } from "better-auth/node";
import router from "./routes";

export const app = express();
app.use(cors({ origin: process.env.APP_URL || "*", credentials: true }));
app.use(express.json());

//* Routes
app.all("/api/auth/*split", toNodeHandler(auth));
app.use("/api", router);
