import { User } from "../../generated/prisma/client";
import { prisma } from "../../lib/prisma";

export const GetsUserService = async () => {
  const result = await prisma.user.findMany();
  return result;
};

export const GetUserService = async (
  id: string,
  userId: string,
  isAdmin: boolean
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });

  if (!isAdmin && userData.id !== userId) {
    throw new Error("Your not real user");
  }

  const result = await prisma.user.findUnique({
    where: {
      id: id,
    },
  });
  return result;
};

export const UpdateUserService = async (
  id: string,
  data: Partial<User>,
  userId: string,
  isAdmin: boolean
) => {
  const userData = await prisma.user.findUniqueOrThrow({
    where: {
      id: id,
    },
    select: {
      id: true,
    },
  });

  if (!isAdmin && userData.id !== userId) {
    throw new Error("Your not real user");
  }

  const result = await prisma.user.update({
    where: {
      id: id,
    },
    data,
  });

  return result;
};

export const DeletedUserService = async (id: string) => {
  const result = await prisma.user.delete({
    where: {
      id: id,
    },
  });

  return result;
};
