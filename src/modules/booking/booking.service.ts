import { Vehicle } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

type CreateBookingPayload = {
  vehicle_id: string;
  rent_start_date: string;
  rent_end_date: string;
  total_price: number;
  customer_id: string;
};

export const CreateBookingService = async (payload: CreateBookingPayload) => {
  return await prisma.$transaction(async (tx) => {
    const vehicle = await tx.vehicle.findUnique({
      where: { id: payload.vehicle_id },
    });

    if (!vehicle) {
      throw new Error("Vehicle not found");
    }

    if (vehicle.availability_status === "booked") {
      throw new Error("Vehicle already booked");
    }

    const startDate = new Date(`${payload.rent_start_date}T00:00:00.000Z`);
    const endDate = new Date(`${payload.rent_end_date}T00:00:00.000Z`);

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (startDate < today) {
      throw new Error("You cannot book a vehicle for a past date");
    }

    const One_day = 1000 * 60 * 60 * 24;
    const numberOfDays =
      Math.ceil(endDate.getTime() - startDate.getTime()) / One_day;

    if (numberOfDays <= 0) {
      throw new Error("Invalid rental date range");
    }

    const totalPrice = vehicle.daily_rent_price * numberOfDays;

    const result = await tx.booking.create({
      data: {
        vehicle_id: payload.vehicle_id,
        rent_start_date: startDate,
        rent_end_date: endDate,
        total_price: totalPrice,
        customer_id: payload.customer_id,
      },
      include: {
        vehicle: {
          select: {
            vehicle_name: true,
            daily_rent_price: true,
          },
        },
      },
    });

    await tx.vehicle.update({
      where: {
        id: payload.vehicle_id,
      },
      data: {
        availability_status: "booked",
      },
    });

    return result;
  });
};

export const GetBookingService = async (
  isAdmin: boolean,
  customerId: string
) => {
  return prisma.booking.findMany({
    where: isAdmin ? {} : { customer_id: customerId },
    select: isAdmin
      ? {
          id: true,
          customer_id: true,
          vehicle_id: true,
          rent_start_date: true,
          rent_end_date: true,
          total_price: true,
          status: true,
          customer: {
            select: { name: true, email: true },
          },
          vehicle: {
            select: {
              vehicle_name: true,
              registration_number: true,
              type: true,
            },
          },
        }
      : {
          id: true,
          vehicle_id: true,
          rent_start_date: true,
          rent_end_date: true,
          total_price: true,
          status: true,
          vehicle: {
            select: {
              vehicle_name: true,
              registration_number: true,
              type: true,
            },
          },
        },
  });
};

export const UpdateBookingService = async (
  id: string,
  data: Partial<Vehicle>,
  customerId: string,
  isAdmin: boolean
) => {
  return await prisma.$transaction(async (tx) => {
    const updateData = await tx.booking.findUniqueOrThrow({
      where: {
        id: id,
      },
      select: {
        id: true,
        customer_id: true,
        vehicle_id: true,
        status: true,
      },
    });

    if (!isAdmin && updateData.customer_id !== customerId) {
      throw new Error("You not real user");
    }

    const newStatus = isAdmin ? "returned" : "cancelled";

    if (updateData.status === "returned") {
      throw new Error("Booking already returned");
    }

    if (updateData.status === "cancelled") {
      throw new Error("Booking already cancelled");
    }

    await tx.vehicle.update({
      where: {
        id: updateData.vehicle_id,
      },
      data: {
        availability_status: "available",
      },
    });

    const result = await tx.booking.update({
      where: {
        id: id,
      },
      data: {
        status: newStatus,
      },
      ...(isAdmin && {
        include: {
          vehicle: {
            select: {
              availability_status: true,
            },
          },
        },
      }),
    });

    return result;
  });
};
