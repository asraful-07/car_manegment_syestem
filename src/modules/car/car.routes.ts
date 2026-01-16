import express from "express";
import {
  CreateCarController,
  DeleteCarController,
  GetCarController,
  GetsCarController,
  UpdateCarController,
} from "./car.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const carRoutes = express.Router();

carRoutes.post("/", authMiddleware(UserRole.ADMIN), CreateCarController);
carRoutes.get("/", GetsCarController);
carRoutes.get("/:id", GetCarController);
carRoutes.put("/:id", authMiddleware(UserRole.ADMIN), UpdateCarController);
carRoutes.delete("/:id", authMiddleware(UserRole.ADMIN), DeleteCarController);

export default carRoutes;
