import express from "express";
import {
  CreateBookingController,
  GetBookingController,
  UpdateBookingController,
} from "./booking.controller";
import { authMiddleware, UserRole } from "../../middleware/authMiddleware";

const bookingRoutes = express.Router();

bookingRoutes.post(
  "/",
  authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER),
  CreateBookingController
);

bookingRoutes.get(
  "/",
  authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER),
  GetBookingController
);

bookingRoutes.put(
  "/:id",
  authMiddleware(UserRole.ADMIN, UserRole.CUSTOMER),
  UpdateBookingController
);

export default bookingRoutes;
