import { RequestHandler } from "express";
import {
  DeletedUserService,
  GetsUserService,
  GetUserService,
  UpdateUserService,
} from "./user.service";
import { UserRole } from "../../middleware/authMiddleware";

export const GetsUserController: RequestHandler = async (req, res) => {
  try {
    const user = await GetsUserService();

    res
      .status(200)
      .json({ success: true, message: "User fetch successfully", data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetUserController: RequestHandler = async (req, res) => {
  try {
    const users = req.user;

    const isAdmin = users?.role === UserRole.ADMIN;
    if (!users) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }
    const user = await GetUserService(
      req.params.id as string,
      users?.id,
      isAdmin
    );

    res
      .status(200)
      .json({ success: true, message: "User fetch successfully", data: user });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateUserController: RequestHandler = async (req, res) => {
  try {
    const users = req.user;

    const isAdmin = users?.role === UserRole.ADMIN;
    if (!users) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const user = await UpdateUserService(
      req.params.id as string,
      req.body,
      users?.id,
      isAdmin
    );

    res.status(200).json({
      success: true,
      message: "User updated successfully",
      data: user,
    });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeletedUserController: RequestHandler = async (req, res) => {
  try {
    await DeletedUserService(req.params.id as string);

    res
      .status(200)
      .json({ success: true, message: "Deleted successfully done" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
