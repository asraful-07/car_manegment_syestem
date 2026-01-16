import express from "express";
import {
  DeletedUserController,
  GetsUserController,
  GetUserController,
  UpdateUserController,
} from "./user.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const userRoutes = express.Router();

userRoutes.get("/", authMiddleware(UserRole.ADMIN), GetsUserController);
userRoutes.get(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER),
  GetUserController
);
userRoutes.put(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER),
  UpdateUserController
);

userRoutes.delete(
  "/:id",
  authMiddleware(UserRole.ADMIN),
  DeletedUserController
);
export default userRoutes;
