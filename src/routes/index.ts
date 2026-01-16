import express from "express";
import carRoutes from "../modules/car/car.routes";
import bookingRoutes from "../modules/booking/booking.routes";
import userRoutes from "../modules/users/user.routes";

const router = express.Router();

router.use("/car", carRoutes);
router.use("/booking", bookingRoutes);
router.use("/user", userRoutes);

export default router;
