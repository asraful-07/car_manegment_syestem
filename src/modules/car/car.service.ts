import {
  AvailabilityStatus,
  Vehicle,
  VehicleType,
} from "../../generated/prisma/client";
import { VehicleWhereInput } from "../../generated/prisma/models";
import { prisma } from "../../lib/prisma";

export const CreateCarService = async (
  data: Omit<Vehicle, "id" | "createdAt" | "updatedAt">
) => {
  const result = await prisma.vehicle.create({
    data,
  });

  return result;
};

export const GetsCarService = async ({
  search,
  authorId,
  vehicleType,
  availabilityStatus,
  page,
  limit,
  skip,
  sortBy,
  sortOrder,
}: {
  search: string | undefined;
  authorId: string | undefined;
  vehicleType: VehicleType | undefined;
  availabilityStatus: AvailabilityStatus | undefined;
  page: number;
  limit: number;
  skip: number;
  sortBy: string;
  sortOrder: string;
}) => {
  const addConnection: VehicleWhereInput[] = [];

  if (search) {
    addConnection.push({
      vehicle_name: {
        contains: search,
        mode: "insensitive",
      },
    });

    if (authorId) {
      addConnection.push({
        authorId,
      });
    }
  }

  // if (vehicleType) {
  //   addConnection.push({ vehicleType });
  // }

  // if (availabilityStatus) {
  //   addConnection.push({ availabilityStatus });
  // }

  const result = await prisma.vehicle.findMany({
    where: { AND: addConnection },
    take: limit,
    skip,
    orderBy: {
      [sortBy]: sortOrder,
    },
  });

  const total = await prisma.vehicle.count({
    where: { AND: addConnection },
  });
  return {
    data: result,
    pagination: {
      total,
      page,
      limit,
      totalPage: Math.ceil(total / limit),
    },
  };
};

export const GetCarService = async (id: string) => {
  return await prisma.$transaction(async (tx) => {
    await tx.vehicle.update({
      where: {
        id: id,
      },
      data: {
        view: {
          increment: 1,
        },
      },
    });
    const result = await tx.vehicle.findUnique({
      where: {
        id,
      },
    });
    return result;
  });
};

export const UpdateCarService = async (
  id: string,
  data: Partial<Vehicle>,
  authorId: string
) => {
  const updatedData = await prisma.vehicle.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (updatedData.authorId !== authorId) {
    throw new Error("You are not real user");
  }

  const result = await prisma.vehicle.update({
    where: {
      id: id,
    },
    data,
  });
  return result;
};

export const DeleteCarService = async (id: string, authorId: string) => {
  const deletedData = await prisma.vehicle.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
      authorId: true,
    },
  });

  if (deletedData.authorId !== authorId) {
    throw new Error("You are not real user");
  }

  const result = await prisma.vehicle.delete({
    where: {
      id: id,
    },
  });
  return result;
};
