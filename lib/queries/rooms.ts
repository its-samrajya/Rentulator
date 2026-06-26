import prisma from "../prisma";

export const getAllRooms = async () => {
  return await prisma.room.count();
};
