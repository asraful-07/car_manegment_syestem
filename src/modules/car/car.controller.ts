import { RequestHandler } from "express";
import {
  CreateCarService,
  DeleteCarService,
  GetCarService,
  GetsCarService,
  UpdateCarService,
} from "./car.service";
import { AvailabilityStatus, VehicleType } from "../../generated/prisma/enums";
import { paginationSort } from "../../helper/paginationSort";

export const CreateCarController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const car = await CreateCarService({ ...req.body, authorId: user?.id });

    res
      .status(201)
      .json({ success: true, message: "Create car successfully", data: car });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetsCarController: RequestHandler = async (req, res) => {
  try {
    const search = req.query.search;
    const searchString = typeof search === "string" ? search : undefined;

    const authorId = req.query.authorId as string | undefined;
    const vehicleType = req.query.category as VehicleType | undefined;
    const availabilityStatus = req.query.search as
      | AvailabilityStatus
      | undefined;

    const { page, limit, skip, sortBy, sortOrder } = paginationSort(req.query);

    const car = await GetsCarService({
      search: searchString,
      authorId,
      vehicleType,
      availabilityStatus,
      page,
      limit,
      skip,
      sortBy,
      sortOrder,
    });
    res
      .status(200)
      .json({ success: true, message: "fetch car successfully", data: car });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const GetCarController: RequestHandler = async (req, res) => {
  try {
    const car = await GetCarService(req.params.id as string);

    res
      .status(200)
      .json({ success: true, message: "car successfully", data: car });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const UpdateCarController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    const car = await UpdateCarService(
      req.params.id as string,
      req.body,
      user?.id
    );

    res
      .status(201)
      .json({ success: true, message: "Updated car successfully", data: car });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};

export const DeleteCarController: RequestHandler = async (req, res) => {
  try {
    const user = req.user;

    if (!user) {
      return res
        .status(401)
        .json({ success: false, message: "Unauthorized user" });
    }

    await DeleteCarService(req.params.id as string, user?.id);

    res
      .status(201)
      .json({ success: true, message: "Deleted car successfully" });
  } catch (err: any) {
    res.status(500).json({ success: false, message: err.message });
  }
};
