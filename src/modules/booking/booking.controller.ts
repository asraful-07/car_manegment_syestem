import { RequestHandler } from "express";
import {
  CreateBookingService,
  GetBookingService,
  UpdateBookingService,
} from "./booking.service";
import { UserRole } from "../../middleware/authMiddleware";

export const CreateBookingController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const booking = await CreateBookingService({
      ...req.body,
      customer_id: user?.id,
    });

    res.status(201).json({
      success: true,
      message: "Created booking successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetBookingController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const isAdmin = user.role === UserRole.ADMIN;

    const booking = await GetBookingService(isAdmin, user?.id);

    res.status(200).json({
      success: true,
      message: "Booking fetch successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateBookingController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    const isAdmin = user?.role === UserRole.ADMIN;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }
    const booking = await UpdateBookingService(
      req.params.id as string,
      req.body,
      user?.id,
      isAdmin
    );

    res.status(201).json({
      success: true,
      message: "Updated booking successfully",
      data: booking,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
